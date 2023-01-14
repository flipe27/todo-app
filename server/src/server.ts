import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors()) 

const prisma = new PrismaClient({
    log: ['query']
})

app.post('/users/login', async (request, response) => {
    const { name, email, picture } = request.body
    var alreadyExists = false

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true
        }
    })

    users.map(user => {
        if (user.email == email) {
            alreadyExists = true

            return response.json(user.id)
        }
    })

    if (!alreadyExists) {
        const newUser = await prisma.user.create({
            data: {
                name, 
                email,
                picture
            }
        })

        return response.json(newUser.id)
    }
})

app.get('/user/:userId', async (request, response) => {
    const userId = request.params.userId

    const user = await prisma.user.findUnique({
        select: {
            name: true,
            email: true,
            picture: true
        },
        where: {
            id: userId
        }
    })

    return response.json(user)
})

app.get('/taskGroups/:userId', async (request, response) => {
    const userId = request.params.userId

    const taskGroups = await prisma.taskGroup.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            tasks: true
        }, 
        where: {
            userId
        }
    })

    return response.json(taskGroups)
})

app.post('/taskGroups/create', async (request, response) => {
    const { userId, name } = request.body

    const taskGroup = await prisma.taskGroup.create({
        data: {
            userId,
            name
        }
    })

    return response.json(taskGroup)
})

app.post('/tasks/create', async (request, response) => {
    const { taskGroupId, title, description, picture } = request.body

    const task = await prisma.task.create({
        data: {
            taskGroupId,
            title,
            description,
            picture
        }
    })

    return response.json(task)
})

app.delete('/tasks/delete/:taskId', async (request, response) => {
    const taskId = request.params.taskId

    const taskToRemove = await prisma.task.findUnique({
        where: {
            id: Number(taskId)
        }
    })

    await prisma.task.delete({
        where: {
            id: Number(taskId)
        }
    })

    return response.json(taskToRemove)
})

app.delete('/taskGroups/delete/:taskGroupId', async (request, response) => {
    const taskGroupId = request.params.taskGroupId

    const taskGroupToRemove = await prisma.taskGroup.findUnique({
        select: {
            id: true,
            name: true,
            createdAt: true,
            tasks: true
        },
        where: {
            id: Number(taskGroupId)
        }
    })  

    await prisma.taskGroup.delete({
        where: {
            id: Number(taskGroupId)
        }
    })

    return response.json(taskGroupToRemove)
})

app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP server is running!')
})
