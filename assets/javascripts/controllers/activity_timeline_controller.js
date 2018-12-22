import { Controller } from "stimulus"
import Chart from 'chart.js'
import 'chartjs-plugin-deferred'

export default class extends Controller {
  static targets = [ "canvas" ]

  connect() {
    this.timelineDates = eval(this.data.get('dates'))
    this.timelineDownloads = eval(this.data.get('downloads'))
    this.timelineReach = eval(this.data.get('reach'))

    this.canvasTarget.height = 250;

    var controller = this

    new Chart(this.canvasTarget, {
      type: 'bar',
      data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        datasets: [
          {
            label: 'Downloads',
            backgroundColor: 'rgba(122, 190, 225, 0.6)',
            borderColor: 'rgba(122, 190, 225, 0.9)',
            data: this.timelineDownloads,
          },
          {
            label: 'Potential Reach',
            type: 'line',
            backgroundColor: 'rgba(348, 203, 52, 0.2)',
            borderColor: 'rgba(348, 203, 52, 0.4)',
            data: this.timelineReach,
          },
        ],
      },
      options: {
        barThickness: 'flex',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          deferred: {
            yOffset: '90%',
            delay: 100,
          },
        },
        scales: {
          xAxes: [{ display: true, gridLines: false }],
          yAxes: [{ display: false }],
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              return controller.timelineDates[tooltipItem[0].index]
            }
          },
          intersect: false,
          mode: 'index',
          position: 'nearest',
        },
      },
    })
  }
}
