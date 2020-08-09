import Vue from 'vue'
import Vuex from 'vuex'

import db from '../plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stream: null,
    streams: []
  },
  mutations: {
    setStream (state, stream) {
      state.stream = stream
    },
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
    },
    async fetchStream ({ state, commit }, streamId) {
      streamId = streamId.toString()
      const stream = state.streams.find(stream => stream.id === streamId)
      if (stream) {
        console.log('loaded from cache')
        commit('setStream', stream)
      } else {
        try {
          const streamDoc = await db.collection('streams').doc(streamId).get()
          if (streamDoc.exists) {
            console.log('loaded from db')
            commit('setStream', streamDoc.data())
          } else {
            console.log('no stream found in db')
            commit('setStream', null)
          }
        } catch (error) {
          console.error('Error fetching stream', error)
        }
      }
    }
  },
  modules: {
  }
})
