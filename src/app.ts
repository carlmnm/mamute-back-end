import 'reflect-metadata'
import 'express-async-errors'
import express, { Express } from 'express'
import cors from 'cors'

import { loadEnv, connectDb, disconnectDB } from '@/config'

import { usersRouter } from '@/routers'
import { authenticationRouter } from '@/routers'

loadEnv()

const app = express()
app
    .use(cors())
    .use(express.json())
    .use('/users', usersRouter)
    .use('/auth', authenticationRouter)

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDB()
}

export default app