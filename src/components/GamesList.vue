<template>
  <v-card>
    <v-toolbar
      tile
      flat
      dense
    >
      <v-toolbar-title>
        Games
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            v-for="game in stream.games"
            :key="game.gameID"
            cols="6"
            sm="4"
            md="3"
          >
            <v-card>
              <!-- <v-toolbar
                color="primary"
                flat
                dense
              >
                <v-toolbar-title>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">{{ game.name }}</span>
                    </template>
                    <span>{{ game.name }}</span>
                  </v-tooltip>
                </v-toolbar-title>
              </v-toolbar> -->
              <v-img
                :src="game.boxArtURL | sizedImgURL"
                :lazy-src="require('@/assets/fireman.png')"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>

              <v-card-text class="text-h6 text-truncate" :title="game.name">
                {{ game.name }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GamesList',
  filters: {
    sizedImgURL (boxArtURL) {
      return boxArtURL.replace(/{width}x{height}/, '285x380')
    }
  },
  computed: {
    ...mapState('streams', ['stream'])
  }
}
</script>

<style>
@media screen and (max-width: 1264px) {
  .v-slide-group.v-item-group > .v-slide-group__prev {
    display: none
  }
}
</style>
