const dayjs = require('dayjs')
const constant = require('./constant')

const getToday = () => {
    const selectedDate = dayjs().
        set('hour', 0).
        set('minute', 0).
        set('second', 0).
        set('millisecond', 0)
    return selectedDate
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

exports.createRecordDate = createRecordDate
exports.getWeeknameFromDate = getWeeknameFromDate
exports.getToday = getToday