import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { CORSConfig } from '../config/cors'
import { connectToPostgres } from '../config/prisma'
import router from './routes'
import { apiReference } from '@scalar/express-api-reference'

dotenv.config()

connectToPostgres()

const port = process.env.PORT || 4000
const app = express()

app.use(CORSConfig)
app.use(express.json())

app.use(
  '/docs',
  apiReference({
    cdn: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference',
    isEditable: true,
    spec: {
      url: './docs/swagger.json',
    },
  }),
)
app.use(helmet())

app.use('/api/', router)

app.listen(port, () => {
  console.info(`✅ API iniciada 🚀 | { PORT:${port} } | - OK`)
})
