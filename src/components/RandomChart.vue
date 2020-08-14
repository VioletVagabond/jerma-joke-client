<template>
  <div>
    <line-chart :height="800" v-if="datacollection" :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LineChart from './LineChart.js'
import tmi from '@/plugins/tmi'
import moment from 'moment'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      options: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        onClick: (evt, item) => {
          console.log(item[0]._index)
        },
        hover: {
          mode: 'nearest',
          intersect: false,
          axis: 'x'
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        pan: {
          enabled: false,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          drag: true,
          speed: 1,
          threshold: 3,
          sensitivity: 0,
          mode: 'x'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              callback: (value, index, values) => {
                const duration = moment.duration(value, 'minutes')
                const hours = Math.floor(duration.asHours())
                const minutes = duration.minutes()
                const formattedHours = hours < 10 ? `0${hours}` : hours
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

                return `${formattedHours}:${formattedMinutes}`
              }
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapState(['stream'])
  },
  created () {
    const data = this.createSeriesData()
    this.datacollection = {
      labels: data.map(d => d.x),
      datasets: [
        {
          fill: false,
          label: 'Joke Score Over Time',
          lineTension: 0.1,
          data: data,
          borderColor: '#4ECDC4',
          borderWidth: 5,
          pointBackgroundColor: function (context) {
            const index = context.dataIndex
            const value = context.dataset.data[index]
            return value.y < 0 ? 'red' : 'blue'
          },
          pointBorderColor: 'green',
          pointBorderWidth: 0,
          pointHitRadius: 1,
          pointRadius: 0
        }
      ]
    }
    if (this.stream !== null && this.stream.type === 'live') {
      tmi.connect()
      let updateGraphIntervalID = null
      tmi.on('connected', () => {
        console.log('connected')
        updateGraphIntervalID = setInterval(this.updateGraph, 5000)
      })

      tmi.on('disconnected', () => {
        console.log('disconnected')
        clearInterval(updateGraphIntervalID)
      })

      tmi.on('message', (target, context, message, self) => {
        if (self) return

        const score = message.match(/(?<=^|\s)[+-]2(?=$|\s)/g)

        if (!score) return

        this.messages.push(score.includes('+2'))
      })

      this.$once('hook:beforeDestroy', () => {
        console.log('destroyed')
        clearInterval(updateGraphIntervalID)
      })
    }
  },
  methods: {
    createSeriesData () {
      const streamData = this.stream.data ? this.stream.data : [{ x: 0, y: 0 }]
      const formattedData = streamData.map(d => {
        return {
          x: d.interval,
          y: d.jokeScore
        }
      })

      return this.interpolateData(formattedData)
    },
    interpolateData (data) {
      const interpolatedData = []
      let score = 0
      for (let i = 0; i <= this.streamUpTime(); i++) {
        const datapoint = data.find(d => d.x === i)
        if (datapoint !== undefined) {
          score = datapoint.y
          interpolatedData.push(datapoint)
        } else {
          interpolatedData.push({
            x: i,
            y: score
          })
        }
      }

      return interpolatedData
    },
    streamUpTime () {
      if (this.stream.type === 'live') return moment().diff(moment(this.stream.startedAt), 'minutes')
      if (this.stream.streamUpTime) return this.stream.streamUpTime
      return this.stream.data[this.stream.data.length - 1].interval
    }
  }
}
</script>

<style>
</style>
