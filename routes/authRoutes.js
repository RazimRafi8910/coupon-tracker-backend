import express from 'express'
import { getUserData, loginUser, logoutUser } from '../controller/authController.js'
import {verifyToken} from '../middleware/verifyUser.js'

const router = express()


router.post('/login', loginUser)
router.get('/logout',verifyToken,logoutUser)
router.get('/get-user',verifyToken,getUserData)


export default router