const express = require('express')
// const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const line = require('@line/bot-sdk')
const config = require('../nuxt.config.js')
const apiRouter = require('./api')
const botRouter = require('./bot')
const app = express()

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// Show environment values
consola.log('NODE_ENV', process.env.NODE_ENV)
consola.log('BASE_URL', process.env.BASE_URL)
consola.log('API_URL', process.env.API_URL)
consola.log('USE_VCONSOLE', process.env.USE_VCONSOLE)
consola.log('SKIP_LOGIN', process.env.SKIP_LOGIN)
consola.log('LIFF_ID', process.env.LIFF_ID)
consola.log(
  'LINE_BOT_CHANNEL_ACCESS_TOKEN',
  process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN
)
consola.log('LINE_BOT_CHANNEL_SECRET', process.env.LINE_BOT_CHANNEL_SECRET)
consola.log('KINTONE_APP_API_TOKEN', process.env.KINTONE_APP_API_TOKEN)
consola.log('KINTONE_APP_DOMAIN', process.env.KINTONE_APP_DOMAIN)
consola.log('KINTONE_APP_ID', process.env.KINTONE_APP_ID)

// LINE Bot
const lineConfig = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET
}
const lineApiClient = new line.Client(lineConfig)
app.locals.lineApiClient = lineApiClient

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // app.use(bodyParser.urlencoded({ extended: true }))
  // app.use(bodyParser.json())
  app.use('/api', apiRouter)
  app.use('/bot', botRouter)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
