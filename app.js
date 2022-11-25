require('dotenv').config()

require('./bot/command')
require('./bot/auth')
require('./bot/feature')
require('./bot/display')

const express = require('express')
const app = express()
const port = process.env.SERVER_APP_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
