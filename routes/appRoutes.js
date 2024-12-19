import express from 'express'
import { verifyManager } from '../middleware/verifyManager.js'
import {verifyToken} from '../middleware/verifyUser.js'
import { managerDashboard,addCoupons, couponsData, searchCouponByNo, studentDetails, studentsData, studentSearch } from '../controller/managerController.js'
import { createCouponIssueRegister } from '../controller/CouponController.js'

const router = express()
router.get('/dashboard',verifyToken,verifyManager, managerDashboard)
router.get('/coupon', verifyToken, verifyManager, couponsData)
router.get('/students', verifyToken, verifyManager, studentsData)
router.get('/student/:studentid', verifyToken, verifyManager,studentDetails )
router.get('/student/search/', verifyToken, verifyManager, studentSearch)
router.get('/coupon/:search_no', verifyToken, verifyManager, searchCouponByNo)
router.post('/coupon/add', verifyToken, verifyManager, addCoupons)
router.post('/coupon/assign', verifyToken, createCouponIssueRegister)

export default router   