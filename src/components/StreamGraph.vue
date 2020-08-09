<template>
  <VueApexCharts type="line" height="800" ref="chart" :options="options" :series="series" />
</template>

<script>
import moment from 'moment'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    VueApexCharts
  },
  props: {
    data: {
      type: Array
    }
  },
  data: () => ({
    testData: [{ data: [{ x: 0, y: 0 }, { x: 1, y: 8 }, { x: 2, y: -1 }, { x: 3, y: 0 }, { x: 4, y: 2 }, { x: 5, y: -5 }, { x: 6, y: -3 }, { x: 7, y: 10 }, { x: 8, y: -6 }, { x: 9, y: -5 }, { x: 10, y: 5 }, { x: 11, y: -6 }, { x: 12, y: -9 }, { x: 13, y: 2 }, { x: 14, y: 5 }, { x: 15, y: 1 }, { x: 16, y: 2 }, { x: 17, y: -4 }, { x: 18, y: 1 }, { x: 19, y: -1 }, { x: 20, y: 1 }, { x: 21, y: 7 }, { x: 22, y: 1 }, { x: 23, y: -6 }, { x: 24, y: 2 }, { x: 25, y: 5 }, { x: 26, y: 0 }, { x: 27, y: -2 }, { x: 28, y: -3 }] }],
    startTime: moment()
  }),
  computed: {
    series () {
      return [{
        name: 'joke score',
        data: this.data.map(d => {
          return {
            x: d.interval,
            y: d.jokeScore
          }
        })
      }]
    },
    dataLength () {
      return this.testData[0].data.length
    },
    options () {
      return {
        chart: {
          id: 'jokeLineChart'
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
          tickAmount: 'dataPoints'
        }
      }
    }
  },
  mounted () {
    // const me = this
    // setInterval(() => {
    //   const data = me.series[0].data
    //   const durationInMinutes = moment().diff(this.startTime, 'minutes')
    //   const index = data.findIndex(p => p.x === durationInMinutes)

    //   if (index !== -1) {
    //     data[index].y = Math.floor(Math.random() * 21) - 10
    //     me.$refs.chart.updateSeries([{
    //       data
    //     }])
    //   } else {
    //     me.$refs.chart.appendData([{
    //       data: [{
    //         x: durationInMinutes,
    //         y: Math.floor(Math.random() * 21) - 10
    //       }]
    //     }])
    //   }
    // }, 1 * 60 * 1000)
  }
}
</script>

<style>

</style>
