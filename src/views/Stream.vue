<template>
  <div>
    <StreamGraph :data="seriesData" v-if="!isLoading && stream !== null" />
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import StreamGraph from '@/components/StreamGraph'

export default {
  name: 'Stream',
  props: ['id'],
  components: {
    StreamGraph
  },
  data: () => ({
    isLoading: true
  }),
  computed: {
    ...mapState(['stream']),
    seriesData () {
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
    streamUpTime () {
      if (this.stream.type === 'live') return moment().diff(moment(this.stream.startedAt), 'minutes')
      if (this.stream.streamUpTime) return this.stream.streamUpTime
      return this.stream.data[this.stream.data.length - 1].interval
    }
  },
  async created () {
    try {
      this.isLoading = true
      await this.fetchStream(this.id)
      this.isLoading = false
    } catch (error) {
      console.log('Error fetching stream', error)
    }
  },
  methods: {
    ...mapActions(['fetchStream']),
    interpolateData (data) {
      const interpolatedData = []
      let score = 0
      for (let i = 0; i <= this.streamUpTime; i++) {
        const datapoint = data.find(d => d.x === i)
        if (datapoint !== undefined) {
          score = datapoint.x
          interpolatedData.push(datapoint)
        } else {
          interpolatedData.push({
            x: i,
            y: score
          })
        }
      }

      return interpolatedData
    }
  }
}
</script>

<style>

</style>
