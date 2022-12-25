const dayjs = require('dayjs')
const constant = require('./constant')

const nextSevenDays = () => {
	let current = dayjs()
	const sevendays = [ current ]
	for (let i = 0; i < 6; i++) {
		current = current.add(1, 'day')
		sevendays.push(current)
	}
	const dateonlyarr = sevendays.map(s => {
		return {
            object: s,
			day: s.day(),
			text: s.format('MM/DD'),
		}
	})

    return dateonlyarr
}

const displayKeyboard = () => {
    const weekdays = constant.weekdays

    const dateonlyarr = nextSevenDays()

	const displayWeekday = []
	for (let i = 0; i < weekdays.length; i++) {
		const weekday = weekdays[i]
		const weekdayDate = dateonlyarr.find(s => s.day === constant.weekNumReference[weekday])
        displayWeekday.push(`${weekday} (${weekdayDate.text})`)
	}

    return displayWeekday
}

const getToday = () => {
    const selectedDate = dayjs().
        set('hour', 0).
        set('minute', 0).
        set('second', 0).
        set('millisecond', 0)
    return selectedDate
}

const setZeroToDate = (date) => {
    const output = date.
        set('hour', 0).
        set('minute', 0).
        set('second', 0).
        set('millisecond', 0)
    return output
}

const createRecordDate = (weekday) => {
    const selectedDate = getToday().
            set('day', constant.weekNumReference[weekday])
    return selectedDate
}

const getWeeknameFromDate = (date) => {
    const weekDayNum = date.get('day')
    for (const weekName in constant.weekNumReference) {
        if (weekDayNum === constant.weekNumReference[weekName]) {
            return weekName
        }
    }
    return ''
}

exports.nextSevenDays = nextSevenDays
exports.displayKeyboard = displayKeyboard
exports.setZeroToDate = setZeroToDate
exports.createRecordDate = createRecordDate
exports.getWeeknameFromDate = getWeeknameFromDate
exports.getToday = getToday