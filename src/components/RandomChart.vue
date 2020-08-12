<template>
  <div>
    <line-chart v-if="datacollection" :chart-data="datacollection" :options="options"></line-chart>
    <v-btn @click="fillData()">Randomize</v-btn>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          mode: 'x',
          speed: 1,
          threshold: 0,
          sensitivity: 0
        }
      }
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      const data = this.getRandomData(100)
      this.datacollection = {
        labels: data,
        datasets: [
          {
            label: 'Joke Score Over Time',
            fill: false,
            borderColor: 'red',
            lineTension: 0.3,
            data: data
          }
        ]
      }
    },
    getRandomData (amount) {
      const data = []
      for (let i = 0; i < amount; i++) {
        data.push(this.getRandomInt())
      }
      return data
    },
    getRandomInt () {
      return Math.floor(Math.random() * (10 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
</style>
