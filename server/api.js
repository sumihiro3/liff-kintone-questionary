const fs = require('fs')
const consola = require('consola')
const Router = require('express-promise-router')
const bodyParser = require('body-parser')
const cors = require('cors')
const kintone = require('@kintone/kintone-js-sdk')

// Express router
const router = new Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// Kintone Settings
const KINTONE_APP_API_TOKEN = process.env.KINTONE_APP_API_TOKEN
const KINTONE_APP_DOMAIN = process.env.KINTONE_APP_DOMAIN
const KINTONE_APP_ID = process.env.KINTONE_APP_ID
// kintone connection
const kintoneAuth = new kintone.Auth()
const authParams = {
  apiToken: KINTONE_APP_API_TOKEN
}
kintoneAuth.setApiToken(authParams)
const connectionParams = {
  domain: KINTONE_APP_DOMAIN,
  auth: kintoneAuth
}
const kintoneConnection = new kintone.Connection(connectionParams)
const kintoneAppId = KINTONE_APP_ID

// Message template
const pushMessage = JSON.parse(
  fs.readFileSync('./server/pushMessage.json', 'utf8')
)
consola.info('push Flex Message', pushMessage)

/*
-------------------------------
Middleware
-------------------------------
*/
const API_KEY = 'API_KEY_000000000'

const apiKeyChecker = function(req, res, next) {
  consola.log('apiKeyChecker called!!')
  consola.log('Request Headers', req.headers)
  const apiKey = req.headers.authorization
  if (API_KEY !== apiKey) {
    res.status(401).json({ message: 'Auth failed...' })
  } else {
    // Pass authorization
    next()
  }
}

/*
-------------------------------
APIs
-------------------------------
*/

router.get('/test', cors(), apiKeyChecker, (req, res, next) => {
  const param = { test: 'success' }
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

router.post(
  '/sendMulticastMessage',
  cors(),
  apiKeyChecker,
  async (req, res) => {
    consola.log('POST sendMulticastMessage called!')
    const data = req.body
    consola.log('Received Data', data)
    const userIds = data.userIds
    const messageTitle = data.message.title
    const messageBody = data.message.body
    const message = generatePushMessage(messageTitle, messageBody)
    try {
      const lineApiClient = req.app.locals.lineApiClient
      await lineApiClient.multicast(userIds, message)
      res.status(200).json({
        code: 'OK',
        message: 'Success!!!!'
      })
    } catch (error) {
      consola.error('Error in multicast', error)
      res.status(400).json({
        code: 'NG',
        message: 'Bad Request...'
      })
    }
  }
)

function generatePushMessage(title, body) {
  const msg = JSON.parse(JSON.stringify(pushMessage))
  msg.body.contents[0].text = title
  msg.body.contents[1].contents[0].text = body
  return {
    type: 'flex',
    altText: title,
    contents: msg
  }
}

router.post('/questionaryAnswer', async (req, res) => {
  consola.log('POST questionaryAnswer called!')
  const data = req.body
  consola.log('Received Data', data)
  const userId = data.userId
  const answer = data.answer
  let apiResult = {
    code: '0000',
    message: 'SUCCESS'
  }
  try {
    const result = await addAnswerRecordToKintone(userId, answer)
    consola.log('Kintone addRecord result', result)
  } catch (error) {
    consola.error('addAnswerRecordToKintone Failed...', error)
    consola.error('Error Object', JSON.stringify(error.error))
    apiResult = {
      code: '9999',
      message: 'FAILED'
    }
  } finally {
    res.status(200).json(apiResult)
  }
})

// for UI test
router.post('/questionaryAnswerFailed', (req, res) => {
  consola.log('POST questionaryAnswerFailed called!')
  const apiResult = {
    code: '9999',
    message: 'FAILED'
  }
  res.status(200).json(apiResult)
})

function addAnswerRecordToKintone(userId, answer) {
  return new Promise((resolve) => {
    // Create record to addRecord
    const kintoneRecord = new kintone.Record({ connection: kintoneConnection })
    const record = {
      q1: {
        value: answer.industry
      },
      q2: {
        value: answer.employmentStatus
      },
      q3: {
        value: answer.workSystem
      },
      q4: {
        value: answer.troubles
      },
      q5: {
        value: answer.memo
      },
      userId: {
        value: userId
      }
    }
    try {
      // Add record
      const result = kintoneRecord.addRecord({
        app: kintoneAppId,
        record
      })
      resolve(result)
    } catch (error) {
      consola.error('Error at kintone addRecord', error)
      Promise.reject(error)
    }
  })
}

module.exports = router
