const constant = require('./constant')
const dayjs = require('dayjs')

const parseList = (list) => {
    const weekNumReference = constant.weekNumReference

    const result = []
    for (let i = 0; i < list.length; i++) {
        const dayObj = dayjs(list[i].targetdate)
        const currentNum = dayObj.get('day')
        let weekDayName = ''
        for (const weekNum in weekNumReference) {
            if (weekNumReference[weekNum] === currentNum) {
                weekDayName = weekNum
                break
            }
        }
        const message = `${dayObj.format('YYYY-MM-DD')}(${weekDayName}) : ${list[i].message}`
        result.push({
            message: message,
            targetDate: dayObj,
        })
    }

    result.sort((a, b) => {
        if (a.targetDate.isBefore(b.targetDate)) return -1
        return 1
    })

    const messageList = result.map(s => s.message)
    const displayList = messageList.join('\n')

    return displayList
}

exports.parseList = parseList