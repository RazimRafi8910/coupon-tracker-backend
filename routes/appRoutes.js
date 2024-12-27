import express from 'express'
import { verifyManager } from '../middleware/verifyManager.js'
import {verifyToken} from '../middleware/verifyUser.js'
import {
    managerDashboard,
    addCoupons,
    couponsData,
    searchCouponByNo,
    studentDetails,
    studentsData,
    studentSearch,
    addStudent,
    coordinatorData,
    coordinatorDetails,
    assignCouponToCoordinator,
    updateRecivedamount,
} from '../controller/managerController.js'
import { createCouponIssueRegister } from '../controller/CouponController.js'

const router = express()

//manager
router.get('/dashboard', verifyToken, verifyManager, managerDashboard)

//manager students
router.get('/students', verifyToken, verifyManager, studentsData)
router.get('/student/:studentid', verifyToken, verifyManager,studentDetails )
router.get('/student/search/', verifyToken, verifyManager, studentSearch)
router.post('/student/add', verifyToken, verifyManager, addStudent)

//manager coordinators
router.get('/coordinator', verifyToken, verifyManager, coordinatorData)
router.get('/coordinator/:coordinatorId', verifyToken, verifyManager, coordinatorDetails)
router.post('/coordinator/:coordinatorId/assign', verifyToken, verifyManager, assignCouponToCoordinator)
router.put('/coordinator/:coordinatorId/update', verifyToken, verifyManager, updateRecivedamount);

//manager coupons
router.get('/coupon', verifyToken, verifyManager, couponsData)
router.get('/coupon/:search_no', verifyToken, verifyManager, searchCouponByNo)
router.post('/coupon/add', verifyToken, verifyManager, addCoupons)
router.post('/coupon/assign', verifyToken, createCouponIssueRegister)

export default router   