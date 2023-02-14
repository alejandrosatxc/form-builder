import { PrismaClient } from '@prisma/client'
import { Form, FormComponent } from '../types/draftee'

const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            forms: {
                create: {
                    title: 'Intake',
                    content: [
                        { name: 'Test', type: 'name', id: '1' },
                        { name: 'Test', type: 'checkbox', id: '2' },
                        { name: 'Test', type: 'radio', id: '3' },
                        { name: 'Test', type: 'contact', id: '4' },
                    ],
                    published: true,
                },
            },
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            forms: {
                create: [
                    {
                        title: 'LOR',
                        content: [
                            { name: 'Test', type: 'name', id: '1' },
                            { name: 'Test', type: 'checkbox', id: '2' },
                            { name: 'Test', type: 'radio', id: '3' },
                            { name: 'Test', type: 'contact', id: '4' },
                        ],
                        published: true,
                    },
                    {
                        title: 'HIPPA',
                        content: [
                            { name: 'Test', type: 'name', id: '1' },
                            { name: 'Test', type: 'checkbox', id: '2' },
                            { name: 'Test', type: 'radio', id: '3' },
                            { name: 'Test', type: 'contact', id: '4' },
                        ],
                        published: true,
                    },
                ],
            },
        },
    })
    //console.log({ alice, bob })

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })