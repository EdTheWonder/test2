import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        let products = await prisma.products.findMany()
        return products
    } catch (error) {
        console.error(error)
        return { error: 'Failed to fetch products' }
    } finally {
        await prisma.$disconnect()
    }
})