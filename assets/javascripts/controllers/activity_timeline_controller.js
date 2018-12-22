import { Controller } from "stimulus"
import Chart from 'chart.js'
import 'chartjs-plugin-deferred'

export default class extends Controller {
  static targets = [ "canvas" ]

  connect() {
    this.downloadData = eval(this.data.get('downloads'))
    this.reachData = eval(this.data.get('reach'))

    this.canvasTarget.height = 250;

    new Chart(this.canvasTarget, {
      type: 'bar',
      data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        datasets: [
          {
            label: 'Downloads',
            backgroundColor: 'rgba(122, 190, 225, 0.6)',
            borderColor: 'rgba(122, 190, 225, 0.9)',
            data: this.downloadData,
          },
          {
            label: 'Potential Reach',
            type: 'line',
            backgroundColor: 'rgba(348, 203, 52, 0.2)',
            borderColor: 'rgba(348, 203, 52, 0.4)',
            data: this.reachData,
          },
        ],
      },
      options: {
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
          position: 'nearest',
          mode: 'index',
          intersect: false,
        },
      },
    })
  }
}
