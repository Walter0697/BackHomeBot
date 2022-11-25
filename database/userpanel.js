const base = require('./base')
const prisma = base.getPrisma()

const upsertPanel = async (panel) => {
    const existing = await prisma.userPanel.findFirst({
        where: {
            chatid: panel.chatId,
        }
    })

    if (existing) {
        const updatedPanel = await prisma.userPanel.update({
            where: {
                id: existing.id,
            },
            data: {
                background: panel.background,
                name: panel.name,
                panelid: panel.panelId,
            },
        })
        
        return updatedPanel
    } else {
        const newPanel = await prisma.userPanel.create({
            data: {
                chatid: panel.chatId,
                background: panel.background,
                name: panel.name,
                panelid: panel.panelId,
            }
        })

        return newPanel
    }
}

const getAllPanel = async (panel_list) => {
    const result = await prisma.userPanel.findMany({
        where: {
            panelid: {
                in: panel_list,
            }
        }
    })

    return result
}

exports.upsertPanel = upsertPanel
exports.getAllPanel = getAllPanel