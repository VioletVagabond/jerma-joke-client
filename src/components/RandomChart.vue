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
        responsive: false,
        maintainAspectRatio: false,
        pan: {
          enabled: false,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          drag: false,
          mode: 'x'
        }
      }
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.getRandomData(20).map((l, i) => i),
        datasets: [
          {
            label: 'Joke Score Over Time',
            fill: false,
            borderColor: 'red',
            lineTension: 0.3,
            data: this.getRandomData(20)
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
