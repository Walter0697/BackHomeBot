const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getPrisma = () => {
    return prisma
}

const closedb = () => {
    prisma.$disconnect()
}

exports.getPrisma = getPrisma
exports.closedb = closedb