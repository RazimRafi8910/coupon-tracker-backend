import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import managerRoutes from './routes/managerRoutes.js'
import coordinatorRoutes from './routes/coordinatorRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import connectDB from './service/DBconnect.js'
import cors from 'cors'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3001
const PRODUCTION = process.env.PRODUCTION
const frontendURL = PRODUCTION == 1 ? process.env.FRONTEDN_URL : 'http://localhost:5173'
console.log(frontendURL)
connectDB()

app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: frontendURL,
    credentials:true,
    methods: ["GET", "POST","PUT"],
}))
app.use(express.json())
app.use(cookieParser())

app.use('/', authRoutes)
app.use('/manager', managerRoutes)
app.use('/coordinator', coordinatorRoutes)
app.use(errorHandler);


app.listen(PORT, () => {
    console.log("server is running")
})