const fs = require('fs')
const consola = require('consola')
const Router = require('express-promise-router')
const line = require('@line/bot-sdk')

// Express router
const router = new Router()

// LINE
const lineConfig = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET
}
let lineApiClient
const followMessage = JSON.parse(
  fs.readFileSync('./server/followMessage.json', 'utf8')
)
consola.info('follow Flex Message', followMessage)

router.post('/webhook', line.middleware(lineConfig), (req, res) => {
  consola.log('Bot webhook called!')
  if (!lineApiClient) {
    lineApiClient = req.app.locals.lineApiClient
  }
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      consola.error(err)
      res.status(500).end()
    })
})

function handleEvent(event) {
  const messages = []
  if (event.type === 'follow') {
    consola.log('Got follow event!!', event)
    // handle follow event
    const message = generateFollowMessage('Thank you for your following')
    messages.push(message)
  } else if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null)
  } else {
    if (
      event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff'
    ) {
      // Connection check on LINE Developers
      consola.log('Had Connection check!!', event)
      return Promise.resolve(null)
    }
    consola.log('Got Text message!!', event)
    // messages.push({ type: 'text', text: event.message.text })
    const message = generateFollowMessage('Thank you for your following')
    messages.push(message)
  }
  // use reply API
  return lineApiClient.replyMessage(event.replyToken, messages)
}

function generateFollowMessage(text) {
  return {
    type: 'flex',
    altText: text,
    contents: followMessage
  }
}

module.exports = router
