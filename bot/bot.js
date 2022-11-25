const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_API_TOKEN
const bot = new TelegramBot(token, { polling: true })

const previousInteraction = {}

exports.bot = bot
exports.previousInteraction = previousInteraction