<template>
  <VueApexCharts type="line" height="800" ref="chart" :options="options" :series="seriesData" />
</template>

<script>
import moment from 'moment'
import VueApexCharts from 'vue-apexcharts'
import { mapState, mapMutations, mapActions } from 'vuex'
import tmi from '@/plugins/tmi'

export default {
  components: {
    VueApexCharts
  },
  data: () => ({
    seriesData: null,
    messages: []
  }),
  computed: {
    ...mapState(['stream']),
    total () {
      return this.messages.reduce((sum, msg) => {
        return msg ? sum + 2 : sum - 2
      }, this.stream.jokeScoreTotal)
    },
    dataLength () {
      return this.seriesData[0].data.length
    },
    options () {
      return {
        chart: {
          id: 'jokeLineChart',
          animations: {
            enabled: false
          }
        },
        stroke: {
          show: true,
          curve: 'smooth'
        },
        theme: {
          mode: 'dark'
        },
        xaxis: {
          type: 'numeric',
          labels: {
            formatter (durationInMinutes) {
              const duration = moment.duration(durationInMinutes, 'minutes')
              const hours = Math.floor(duration.asHours())
              const minutes = duration.minutes()
              const formattedHours = hours < 10 ? `0${hours}` : hours
              const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

              return `${formattedHours}:${formattedMinutes}`
            }
          },
          tickAmount: this.dataLength < 15 ? 'dataPoints' : 15
        }
      }
    }
  },
  created () {
    this.seriesData = this.createSeriesData()
    if (this.stream !== null && this.stream.type === 'live') {
      tmi.connect()
      let updateGraphInterval = null
      tmi.on('connected', () => {
        console.log('connected')
        updateGraphInterval = setInterval(this.updateGraph, 5000)
      })

      tmi.on('disconnected', () => {
        console.log('disconnected')
        clearInterval(updateGraphInterval)
      })

      tmi.on('message', (target, context, message, self) => {
        if (self) return

        const score = message.match(/(?<=^|\s)[+-]2(?=$|\s)/g)

        if (!score) return

        this.messages.push(score.includes('+2'))
      })

      this.$once('hook:beforeDestroy', () => {
        console.log('destroyed')
        clearInterval(updateGraphInterval)
      })
    }
  },
  methods: {
    ...mapMutations(['addStreamData', 'updateStreamData']),
    ...mapActions(['fetchStream']),
    streamUpTime () {
      if (this.stream.type === 'live') return moment().diff(moment(this.stream.startedAt), 'minutes')
      if (this.stream.streamUpTime) return this.stream.streamUpTime
      return this.stream.data[this.stream.data.length - 1].interval
    },
    createSeriesData () {
      const streamData = this.stream.data ? this.stream.data : [{ x: 0, y: 0 }]
      const formattedData = streamData.map(d => {
        return {
          x: d.interval,
          y: d.jokeScore
        }
      })

      const interpolatedData = this.interpolateData(formattedData)

      return [{
        name: 'joke score',
        data: interpolatedData
      }]
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
    updateGraph () {
      const data = this.seriesData[0].data
      const index = data.findIndex(d => d.x === this.streamUpTime())
      if (index !== -1) {
        console.log('up', index)
        data[index].y = this.total
        this.$refs.chart.updateSeries([{
          data
        }])
      } else {
        console.log('app')
        this.$refs.chart.appendData([{
          data: [{
            x: this.streamUpTime(),
            y: this.total
          }]
        }])
      }
    }
  }
}
</script>

<style>

</style>
