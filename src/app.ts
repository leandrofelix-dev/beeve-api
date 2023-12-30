import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { CORSConfig } from '../config/cors'

import router from './routes'
import { connectToDatabase } from '../config/prisma'

dotenv.config()

connectToDatabase()

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(CORSConfig)
app.use(helmet())

app.use('/api/', router)

app.listen(port, () => {
  console.info(`API iniciada na porta ${port} 🚀`)
})
