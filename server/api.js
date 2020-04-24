const express = require('express')
const router = express.Router()

router.get('/test', (req, res, next) => {
  const param = { test: 'success' }
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

module.exports = router
