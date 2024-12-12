import express from 'express'
import { getUserData, loginUser } from '../controller/authController.js'
import {verifyToken} from '../middleware/verifyUser.js'

const router = express()


router.post('/login', loginUser)
router.get('/logout')
router.get('/get-user',verifyToken,getUserData)


export default router