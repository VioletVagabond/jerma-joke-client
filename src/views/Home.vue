<template>
  <div class="home">
    <v-row justify="center">
      <v-col
        v-for="stream in streams"
        :key="stream.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <StreamTile
          :id="stream.id"
          :title="stream.title"
          :thumbnailUrl="stream.thumbnailURL"
        />
      </v-col>
    </v-row>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>
</template>

<script>
import StreamTile from '@/components/StreamTile'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    StreamTile
  },
  data: () => ({
  }),
  computed: {
    ...mapState(['streams'])
  },
  async created () {
    try {
      this.fetchStreams()
    } catch (error) {
      console.error('Error fetching streams', error)
    }
  },
  methods: {
    ...mapActions(['fetchStreams'])
  }
}
</script>
