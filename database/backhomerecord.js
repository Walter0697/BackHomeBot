const base = require('./base')
const { getToday, createRecordDate, nextSevenDays } = require('../utils/date')
const constant = require('../utils/constant')
const prisma = base.getPrisma()

const upsertRecord = async (record) => {
    const existing = await prisma.backHomeRecord.findFirst({
        where: {
            chatid: record.chatId,
            targetdate: record.targetDate,
        }
    })

    if (existing) {
        const updateRecord = await prisma.backHomeRecord.update({
            where: {
                id: existing.id,
            },
            data: {
                message: record.value,
            },
        })

        return updateRecord
    } else {
        const newRecord = await prisma.backHomeRecord.create({
            data: {
                chatid: record.chatId,
                targetdate: record.targetDate,
                message: record.value,
            }
        })

        return newRecord
    }
}

const today = async (chatIds) => {
    const today = getToday().toDate()
    const first = await prisma.backHomeRecord.findMany({
        where: {
            chatid: {
                in: chatIds,
            },
            targetdate: today,
        }
    })

    return first
}

const upcoming6 = async (chatIds) => {
    const today = getToday().toDate()
    const day6 = getToday().add(7, 'day').toDate()

    const result = await prisma.backHomeRecord.findMany({
        where: {
            chatid: {
                in: chatIds,
            },
            targetdate: {
                gt: today,
                lte: day6,
            }
        }
    })

    return result
}

const thisweek = async (chatId) => {
    const weekNumReference = constant.weekNumReference
    let startName = null
    let endName = null
    for (const key in weekNumReference) {
        if (!startName) startName = key
        endName = key        
    }
    const start = createRecordDate(startName).toDate()
    const end = createRecordDate(endName).toDate()

    const result = await prisma.backHomeRecord.findMany({
        where: {
            chatid: chatId,
            targetdate: {
                gte: start,
                lte: end,
            }
        }
    })

    return result
}

const upcoming = async (chatId) => {
    const today = getToday().toDate()
    const result = await prisma.backHomeRecord.findMany({
        where: {
            chatid: chatId,
            targetdate: {
                gte: today,
            }
        }
    })

    return result
}

exports.upsertRecord = upsertRecord
exports.today = today
exports.thisweek = thisweek
exports.upcoming = upcoming
exports.upcoming6 = upcoming6