const sendMessage = require('./sendMessage')

;(async () => {
  try {
    console.info('sending Slack message')
    await sendMessage()
    console.info('✔  sent message to Slack')
  } catch (e) {
    console.info('✖ failed to send message')
    console.info(e)
    process.exit(1)
  }
})()
