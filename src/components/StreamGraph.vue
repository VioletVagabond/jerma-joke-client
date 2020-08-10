<template>
  <VueApexCharts type="line" height="800" ref="chart" :options="options" :series="data" />
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
  computed: {
    dataLength () {
      return this.data[0].data.length
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
          tickAmount: this.dataLength < 15 ? 'dataPoints' : 15
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
