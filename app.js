require('dotenv').config()

require('./bot/command')
require('./bot/auth')
require('./bot/feature')
require('./bot/display')

const { upsertPanel, getAllPanel } = require('./database/userpanel')
const { today, upcoming6 } = require('./database/backhomerecord')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dayjs = require('dayjs')

const app = express()
const port = process.env.SERVER_APP_PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('public'))

app.post('/panel', async (req, res) => {
  try {
    const body = req.body
    const data = {
      chatId: body.chatId,
      background: body.background,
      name: body.name,
      panelId: body.panelId,
    }

    const result = await upsertPanel(data)
    res.json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

app.get('/display', async (req, res) => {
  try {
    const ids = req.query.ids
    const idInts = ids.map(s => parseInt(s))

    const panels = await getAllPanel(idInts)
    const chatids = panels.map(s => s.chatid)
    const result = await today(chatids)
    const upcoming = await upcoming6(chatids)

    res.json({
      result,
      panels,
      upcoming,
      now: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

app.listen(port, () => {
  console.log(`BackHome Bot Server listening on port ${port}`)
})
