import express from 'express'
import { initStorage } from './configs/storage.config.js'
import blogRouter from './routers/blog.router.js'
import { PORT } from './configs/env.config.js'

const app = express()

app.use(express.json())

initStorage()

app.use('/blogs', blogRouter)

app.listen(PORT, () => {
    console.log(`App start successfully on port ${PORT}`)
})