import { Controller } from 'stimulus'

import * as d3 from 'd3'
import scaleCluster from 'd3-scale-cluster'
import * as topojson from 'topojson'

export default class extends Controller {
  static targets = [ "map" ]

  connect() {
    this.width = 600
    this.height = 400
    this.active = d3.select(null)
    this.rotated = false

    this.projection = d3.geoMercator()
      .rotate([0,0])
      .scale(90)
      .translate([this.width / 2, this.height / 2 + 80])

    this.zoom = d3.zoom().on('zoom', () => this.zoomed())
    this.path = d3.geoPath().projection(this.projection)

    this.tooltip = d3.select(this.mapTarget)
      .append('div')
      .attr('class', 'country-tooltip')

    this.svg = d3.select(this.mapTarget)
      .append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 600 400")
      .on('click', () => this.stopped(), true)

    this.svg.append('rect')
      .attr('class', 'background')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('click', () => this.reset())

    this.g = this.svg.append('g')

    this.svg.call(this.zoom)

    this.addZoomControls()

    this.downloads = JSON.parse(this.data.get('download-data'))

    let worldDataURL = this.data.get('world-data')

    d3.json(worldDataURL)
      .then((data) => this.ready(data))
  }

  addZoomControls() {
    let controls = d3.select(this.mapTarget)
      .append('div')
      .attr('class', 'zoom-control')

    controls.append('button')
      .attr('class', 'zoom-in-control')
      .attr('title', 'Zoom In Control')
      .text('+')
      .on('click', (e) => this.handleZoomClick('in'))

    controls.append('button')
      .attr('class', 'zoom-out-control')
      .attr('title', 'Zoom Out Control')
      .html('&ndash;')
      .on('click', (e) => this.handleZoomClick('out'))
  }

  ready(world) {
    let dataset = Object.values(this.downloads).map((d) => d.downloads).reverse()

    let colorizer = scaleCluster()
      .domain(dataset)
      // blues
      .range(["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"])
      // purples
      // .range(["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"])
      // PuBu
      // .range(["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"])
      // YlGnBu
      // .range(["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"])

    this.addCountries(world, colorizer)
  }

  addCountries(world, colorizer) {
    var countries = topojson.feature(world, world.objects.countries).features
    console.log(countries)

    this.g
      .append('g')
      .attr('id', 'countries')
      .attr('class', 'countries')
      .selectAll('.country')
      .data(countries)
      .enter().append('path')
      .attr('class', 'country')
      .attr('d', this.path)
      .attr('id', d => `country_${d.id}`)
      .style('fill', d => {
        let entry = this.downloads[d.id] || {}
        return colorizer(entry['downloads'] || 0)
      })
      .on('click', d => this.handleClick(d))
      .on('mouseover', d => this.handleMouseOver(d))
      .on('mouseout', d => this.handleMouseOut(d))
      .on('mousemove', d => this.handleMouseMove(d))
  }

  redrawCountries() {
    d3.selectAll('.country').attr('d', this.path)
  }

  handleClick(d) {
    let node = d3.event.toElement

    if (this.active.node() === node) {
      return this.reset()
    }

    this.active
      .classed('active', false)
      .style('display', null)

    this.active = d3.select(node)

    this.hideAllRegions()

    // russia, fiji, the united states, and new zealand are on both ends of the map,
    // so rotate the projection a little to get them on one end of the map before zooming
    if (['FJ', 'RU', 'NZ'].includes(d.id)) {
      this.rotateProjection(-12, () => {
        this.loadAndDisplayRegions(d)
        this.zoomCountry(node, d)
      })
    } else if (d.id == 'US') {
      this.rotateProjection(12, () => {
        this.loadAndDisplayRegions(d)
        this.zoomCountry(node, d)
      })
    } else {
      this.resetProjection(() => {
        this.loadAndDisplayRegions(d)
        this.zoomCountry(node, d)
      })
    }
  }

  // zoom in on a the selected country
  zoomCountry(node, d) {
    this.active.classed('active', true)

    let bounds = this.path.bounds(d)
    let dx = bounds[1][0] - bounds[0][0]
    let dy = bounds[1][1] - bounds[0][1]
    let x = (bounds[0][0] + bounds[1][0]) / 2
    let y = (bounds[0][1] + bounds[1][1]) / 2
    let scale = Math.max(1, Math.min(100, 0.9 / Math.max(dx / this.width, dy / this.height)))
    let translate = [this.width / 2 - scale * x, this.height / 2 - scale * y]

    let settings = d3.zoomIdentity
      .translate(translate[0], translate[1])
      .scale(scale)

    this.svg
      .transition()
      .duration(250)
      .call((s, settings) => {
        this.zoom.transform(s, settings)
      }, settings)
  }

  handleMouseOver(d) {
    d3.select(d3.event.toElement).classed('selected', true)

    if (d.properties.name) {
      this.tooltip
        .html(this.tooltipText(d))
        .style('left', (d3.event.offsetX + 7) + 'px')
        .style('top', (d3.event.offsetY - 15) + 'px')
        .style('display', 'block')
        .style('opacity', 1);
    }
  }

  tooltipText(d) {
    let entry = this.downloads[d.id] || {}

    return `<span class="title">${d.properties.name}</span><span class="data">Downloads: ${entry['downloads'] || 0}</span>`
  }

  handleMouseOut(d) {
    d3.select(d3.event.fromElement).classed('selected', false)

    this.tooltip
      .style('opacity', 0)
      .style('display', 'none')
  }

  handleMouseMove(d) {
    this.tooltip
      .style('left', (d3.event.offsetX + 7) + 'px')
      .style('top', (d3.event.offsetY - 15) + 'px')
  }

  handleZoomClick(direction) {
    let multiplier = (direction == 'in') ? 1.5 : 0.66
    let z = d3.zoomTransform(d3.select('svg').node()).k * multiplier

    this.svg
      .transition()
      .duration(300)
      .call((s, z) => this.zoom.scaleTo(s, z), z)
  }

  reset() {
    this.active
      .classed('active', false)
      .style('display', 'block')

    this.active = d3.select(null);

    this.resetProjection(() => {
      this.svg
        .transition()
        .duration(500)
        .call((selection, settings) => this.zoom.transform(selection, settings), d3.zoomIdentity)

      this.svg
        .selectAll('.country')
        .transition()
        .duration(500)
        .style('opacity', 1)

      this.hideAllRegions()
    })
  }

  zoomed() {
    // this.g.style('stroke-width', 1.5 / d3.event.transform.k + 'px')
    this.g.attr('transform', d3.event.transform)
  }

  stopped() {
    if (d3.event.defaultPrevented) {
      d3.event.stopPropagation()
    }
  }

  // rotate the projection -20 degrees on the X axis
  rotateProjection(degrees, callback) {
    if (this.rotated) {
      callback()
      return
    }

    this.rotated = true

    d3.transition()
      .duration(100)
      .tween('rotate', () => {
        var r = d3.interpolate(this.projection.rotate(), [degrees, 0])
        return (t) => {
          this.projection.rotate(r(t))
          this.redrawCountries()
        }
      })
      .on('end', callback)
  }

  // reset the projection back to the default rotation on the X axis
  resetProjection(callback) {
    if (!this.rotated) {
      callback()
      return
    }

    this.rotated = false

    d3.transition()
      .duration(100)
      .tween('rotate', () => {
        var r = d3.interpolate(this.projection.rotate(), [0, 0])
        return (t) => {
          this.projection.rotate(r(t))
          this.redrawCountries()
        }
      })
      .on('end', () => {
        callback()
      })
  }

  loadAndDisplayRegions(d) {
    if (d3.select(`#regions_${d.id}`).empty()) {
      d3.json(`/topojson/states_${d.id}.topo.json`)
        .then((data) => this.addRegions(d, data))
    } else {
      this.showRegions(d)
    }
  }

  addRegions(d, data) {
    console.log('REGION', data)
    if (data.objects.states.type == null) {
      return
    }

    var regions = topojson.feature(data, data.objects.states).features
    var country = d3.select(`#country_${d.id}`)

    this.g
      .append('g')
      .attr('id', `regions_${d.id}`)
      .attr('class', 'regions')
      .selectAll('.region')
      .data(regions)
      .enter().append('path')
      .attr('class', 'region')
      .attr('d', this.path)
      .style('fill', country.style('fill'))
      .on('click', () => this.reset())
      .on('mouseover', d => this.handleMouseOver(d))
      .on('mouseout', d => this.handleMouseOut(d))

    country.style('display', 'none')
  }

  showRegions(d) {
    var region = this.svg.select(`#regions_${d.id}`)

    region.selectAll('.region').attr('d', this.path)
    region.style('display', 'block')
    this.active.style('display', 'none')
  }

  hideAllRegions() {
    this.svg.selectAll('g.regions').style('display', 'none')
  }
}
