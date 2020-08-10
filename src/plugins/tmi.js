import tmi from 'tmi.js'

// eslint-disable-next-line new-cap
export default new tmi.client({
  connection: {
    secure: true,
    reconnect: true,
    timeout: 1000
  },
  channels: [process.env.VUE_APP_CHANNEL_NAME]
})
