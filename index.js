import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import connectDB from './service/DBconnect.js'
import cors from 'cors'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3001

const frontendURL = PRODUCTION ? process.env.FRONTEDN_URL : 'http://localhost:5173'

connectDB()

app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: frontendURL,
    credentials:true,
    methods: ["GET", "POST"],
}))
app.use(express.json())
app.use(cookieParser())

app.use('/',authRoutes)


app.listen(PORT, () => {
    console.log("server is running")
})