const { bot, previousInteraction } = require('./bot')
const constant = require('../utils/constant')

bot.onText(/\/start/, async (msg, match) => {
	const chatId = msg.chat.id

    previousInteraction[chatId] = null
	bot.sendMessage(chatId, 'please use /register to start the application')
})

bot.onText(/\/help/, async (msg, match) => {
	const chatId = msg.chat.id

	previousInteraction[chatId] = null
	bot.sendMessage(chatId, constant.helperMessage)
})

