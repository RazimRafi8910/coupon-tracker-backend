import mongoose from "mongoose";
import dotenv from 'dotenv'
import {createUSer} from '../utils/dbService.js'
dotenv.config()


const URI = process.env.MONGODB_URI

async function connectDB() {
    try {
        await mongoose.connect(URI)   
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}

//createUSer()
//current std id = 100
//razim2
//manager
//razim
//razim rafi

export default connectDB