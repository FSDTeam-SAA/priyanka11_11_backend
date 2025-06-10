import app from './app'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
