import express from 'express'
import userRoutes from './routes/auth.routes'
import dataRoutes from './routes/data.routes'
import errorMiddleware from './middlewares/error.middleware'

const app = express()

app.use(express.json())

app.use('/api/v1/users', userRoutes)

app.use("/api/v1/data", dataRoutes)

app.use(errorMiddleware)

export default app
