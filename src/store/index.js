import Vue from 'vue'
import Vuex from 'vuex'

import db from '../plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    streams: []
  },
  mutations: {
    setStreams (state, streams) {
      state.streams = streams
    },
    addStream (state, stream) {
      state.streams.push(stream)
    }
  },
  actions: {
    async fetchStreams ({ commit }) {
      try {
        const querySnapshot = await db.collection('streams')
          .where('type', '==', 'offline')
          .where('userID', '==', process.env.VUE_APP_CHANNEL_ID)
          .orderBy('startedAt', 'desc')
          .limit(6)
          .get()

        const streams = []
        querySnapshot.forEach(doc => {
          streams.push(doc.data())
        })

        commit('setStreams', streams)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
