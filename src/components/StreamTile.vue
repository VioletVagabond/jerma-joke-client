<template>
  <v-card>
    <v-img
      :src="sizedThumbnail"
      :srcset="srcset"
    >
    </v-img>
    <v-card-title>
      {{ title }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'StreamTile',
  props: {
    title: {
      type: String
    },
    thumbnailUrl: {
      type: String
    }
  },
  computed: {
    sizedThumbnail () {
      if (!this.thumbnailUrl) return ''
      return this.replaceAll(this.thumbnailUrl, { '{width}': '1920', '{height}': '1080' })
    },
    srcset () {
      if (!this.thumbnailUrl) return ''
      return `
        ${this.replaceAll(this.thumbnailUrl, { '{width}': '1920', '{height}': '1080' })} 1920w,
        ${this.replaceAll(this.thumbnailUrl, { '{width}': '1280', '{height}': '720' })} 1280w,
        ${this.replaceAll(this.thumbnailUrl, { '{width}': '640', '{height}': '360' })} 640w,
        ${this.replaceAll(this.thumbnailUrl, { '{width}': '256', '{height}': '144' })} 256w
      `
    }
  },
  methods: {
    replaceAll (str, map) {
      const reg = new RegExp(Object.keys(map).join('|'), 'g')
      return str.replace(reg, (matched) => {
        return map[matched]
      })
    }
  }
}
</script>

<style>

</style>
