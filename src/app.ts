import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

import router from './routes'

require('dotenv').config()

const port = process.env.PORT ?? 4000
const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  }),
)

app.use('/api/', router)

app.listen(port, () => {
  console.log(`✨ API is started at port: ${port} ✅`)
})

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})
