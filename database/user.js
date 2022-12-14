const base = require('./base')
const prisma = base.getPrisma()

const getUserByChatId = async (chatid) => {
    const user = await prisma.user.findFirst({
        where: {
            chatid: chatid,
        }
    })
    
    return user
}

const createUser = async (username, chatid) => {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            chatid: chatid,
            activated: false,
        },
    })

    return newUser
}

exports.getUserByChatId = getUserByChatId
exports.createUser = createUser