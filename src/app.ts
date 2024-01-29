import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { CORSConfig } from '../config/cors'
import { connectToPostgres } from '../config/prisma'
import { connectToSupabase } from '../config/supa'
import router from './routes'

dotenv.config()

connectToPostgres()
connectToSupabase()

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(CORSConfig)
app.use(helmet())

app.use('/api/', router)

app.listen(port, () => {
  console.info(`API iniciada na porta ${port} 🚀`)
})
