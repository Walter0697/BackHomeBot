const { bot, previousInteraction } = require('./bot')
const { parseList } = require('../utils/records')
const { thisweek, upcoming } = require('../database/backhomerecord')

bot.onText(/\/display/, async (msg, match) => {
    const chatId = msg.chat.id

    previousInteraction[chatId] = null 
    
    const records = await thisweek(chatId)

    const displayList = parseList(records)

    return bot.sendMessage(chatId, displayList)
})

bot.onText(/\/upcoming/, async (msg, match) => {
    const chatId = msg.chat.id

    previousInteraction[chatId] = null 

    const records = await upcoming(chatId)

    const displayList = parseList(records)

    return bot.sendMessage(chatId, displayList)
})