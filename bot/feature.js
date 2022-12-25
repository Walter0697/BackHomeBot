const { bot, previousInteraction } = require('./bot')
const constant = require('../utils/constant')
const { setZeroToDate, getWeeknameFromDate } = require('../utils/date')
const dayjs = require('dayjs')
const { getUserByChatId } = require('../database/user')
const { upsertRecord } = require('../database/backhomerecord')
const { nextSevenDays, displayKeyboard } = require('../utils/date')

bot.onText(/\/tell/, async (msg, match) => {
	const chatId = msg.chat.id

	const user = await getUserByChatId(chatId)

	if (!user || !user.activated) {
		return bot.sendMessage(chatId, 'you are not authorized to use this application')
	}

	previousInteraction[chatId] = {
		state: constant.userState.SELECT_WEEK,
	}

	const w = displayKeyboard()
	const selectDate =  constant.selectDate
	const output = [[
		w[0], w[1], w[2],
	], [
		w[3], w[4], w[5], w[6],
	], [
		selectDate,
	]]

	bot.sendMessage(msg.chat.id, 'Please select a day of week:', {
		'reply_markup': {
			'keyboard': output,
		}
	})
})

const commandList = ['/tell', '/start', '/help', '/register', '/display', '/upcoming']

bot.on('message', async (msg) => {
	const chatId = msg.chat.id

    if (commandList.includes(msg.text)) {
        return
    }

	const currentState = previousInteraction[chatId]

	if (!currentState) {
		return bot.sendMessage(chatId, constant.helperMessage)
	}

	if (currentState.state === constant.userState.SELECT_WEEK) {
		if (msg.text === constant.selectDate) {
			previousInteraction[chatId] = {
				state: constant.userState.SELECT_DATE,
			}
			bot.sendMessage(msg.chat.id, 'Please type a date with format (YYYY-MM-DD)')
		} else {
			const textsplit = msg.text.split(' (')
			let isValid = false
			if (textsplit.length === 2) {
				if (!constant.weekdays.includes(textsplit[0])) {
					isValid = false
				} else {
					isValid = true
				}

				if (isValid) {
					const selected = textsplit[0]

					previousInteraction[chatId] = {
						state: constant.userState.TYPE_MESSAGE,
						data: {
							type: 'weekday',
							value: selected,
						}
					}
					bot.sendMessage(msg.chat.id, 'You selected: ' + msg.text + ', please type your message', {
						'reply_markup': {
							'keyboard': constant.options.backHomeChoice,
						}
					})
					return
				}
			} 
			
			if (!isValid) {
				const w = displayKeyboard()
				const selectDate =  constant.selectDate
				const output = [[
					w[0], w[1], w[2],
				], [
					w[3], w[4], w[5], w[6],
				], [
					selectDate,
				]]

				bot.sendMessage(msg.chat.id, 'Invalid reply, please select again:', {
					'reply_markup': {
						'keyboard': output,
					}
				})
			}
		}
	} else if (currentState.state === constant.userState.SELECT_DATE) {
		const message = msg.text
		try {
			const date = dayjs(message, 'YYYY-MM-DD')
			previousInteraction[chatId] = {
				state: constant.userState.TYPE_MESSAGE,
				data: {
					type: 'selected',
					value: message
				}
			}
			bot.sendMessage(msg.chat.id, 'You selected: ' + message + ', please type your message', {
				'reply_markup': {
					'keyboard': constant.options.backHomeChoice,
				}
			})
		} catch (e) {
			return bot.sendMessage(msg.chat.id, 'Invalid Date format, please try again')
		}
	} else if (currentState.state === constant.userState.TYPE_MESSAGE) {
		if (currentState.data.type === 'weekday') {
			try {
				const availableDate = nextSevenDays()
				const selectedWeekday = currentState.data.value
				
				const selectedDateObj = availableDate.find(s => s.day === constant.weekNumReference[selectedWeekday])
				const selectedDate = setZeroToDate(selectedDateObj.object)

				const data = {
					chatId,
					targetDate: selectedDate.toDate(),
					value: msg.text,
				}
				const result = await upsertRecord(data)

				previousInteraction[chatId] = null
				bot.sendMessage(msg.chat.id, `Saved Record for: ${selectedDate.format('YYYY-MM-DD')}(${selectedWeekday})`, {
					'reply_markup': {
						remove_keyboard: true
					}
				})
			} catch(e) {
				bot.sendMessage(msg.chat.id, 'Error occurs!')
				console.log(e)
			}			
		} else {
			try {
				const selectedDate = dayjs(currentState.data.value, 'YYYY-MM-DD')
				const selectedWeekday = getWeeknameFromDate(selectedDate)
				const data = {
					chatId,
					targetDate: selectedDate.toDate(),
					value: msg.text,
				}
				const result = await upsertRecord(data)

				previousInteraction[chatId] = null
				bot.sendMessage(msg.chat.id, `Saved Record for: ${selectedDate.format('YYYY-MM-DD')}(${selectedWeekday})`, {
					'reply_markup': {
						remove_keyboard: true
					}
				})
			} catch(e) {
				bot.sendMessage(msg.chat.id, 'Error occurs!')
				console.log(e)
			}	
		}
	}
})
