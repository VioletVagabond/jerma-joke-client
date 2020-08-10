<template>
  <div>
    <StreamGraph v-if="!isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    ...mapActions(['fetchStream'])
  }
}
</script>

<style>

</style>
