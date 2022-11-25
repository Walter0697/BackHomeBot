const base = require('./base')
const prisma = base.getPrisma()

const getSetting = async (label) => {
    const setting = await prisma.setting.findFirst({
        where: {
            label: label,
        }
    })

    return setting
} 

exports.getSetting = getSetting