import express from 'express'
import { verifyManager } from '../middleware/verifyManager.js'
import {verifyToken} from '../middleware/verifyUser.js'
import { addCoupons, couponsData, searchCouponByNo, studentsData } from '../controller/managerController.js'

const router = express()

router.get('/coupon', verifyToken, verifyManager, couponsData)
router.get('/students',verifyToken,verifyManager,studentsData)
router.get('/coupon/:search_no',verifyToken,verifyManager,searchCouponByNo)
router.post('/coupon/add', verifyToken, verifyManager, addCoupons)

export default router   