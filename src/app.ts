import express from 'express'
import userRoutes from './routes/auth.routes'
import dataRoutes from './routes/data.routes'
import errorMiddleware from './middlewares/error.middleware'
import cors from 'cors'
const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)


app.use(express.json())

app.use('/api/v1', userRoutes)

app.use("/api/v1", dataRoutes)

app.use(errorMiddleware)

export default app
