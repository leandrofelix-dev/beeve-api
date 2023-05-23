import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

import router from './routes'

require('dotenv').config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(helmet())

app.use(
  (
    req: any,
    res: { header: (arg0: string, arg1: string) => void },
    next: () => void,
  ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )
    app.use(cors())
    next()
  },
)
app.use('/api/', router)

app.listen(port, async () => {
  console.log(`
  ✨ The API is started in: ${port} ✅`)
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
