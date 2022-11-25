const { bot } = require('./bot')
const constant = require('../utils/constant')

const { getSetting } = require('../database/setting')
const { getUserByChatId, createUser } = require('../database/user')

bot.onText(/\/register/, async (msg, match) => {
    const chatId = msg.chat.id

    previousInteraction[chatId] = null
    
    const allowAddSetting = await getSetting(constant.allowAddSetting)

    if (!allowAddSetting) {
        return bot.sendMessage(chatId, 'app setting is still being configured')
    }
    if (allowAddSetting) {
        if (!allowAddSetting.boolValue) {
            return bot.sendMessage(chatId, 'this app currently is not allowing any registration')
        }
    }

    const user = await getUserByChatId(chatId)
    
    if (user) {
        return bot.sendMessage(chatId, 'you had already registered to this app')
    }

    const newUser = await createUser(msg.chat.username, msg.chat.id)

    bot.sendMessage(chatId, 'registration completed, please wait for administration reply')
})