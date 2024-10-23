import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './db/db'


let PORT: number = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 5000


const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())

import PostRouter from './route/post'
app.use('/post', PostRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})