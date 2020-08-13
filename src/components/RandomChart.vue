<template>
  <div>
    <line-chart v-if="datacollection" :chart-data="datacollection" :options="options"></line-chart>
    <v-btn @click="fillData(20)">Randomize</v-btn>
    <v-btn @click="fillData(21)">add</v-btn>
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
          enabled: false,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          drag: false,
          speed: 1,
          threshold: 3,
          sensitivity: 0,
          mode: 'x'
        }
      }
    }
  },
  mounted () {
    this.fillData(20)
  },
  methods: {
    fillData (size) {
      const data = this.getRandomData(size)
      this.datacollection = {
        labels: [...data.keys()],
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
