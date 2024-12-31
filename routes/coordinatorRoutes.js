import express from 'express';
import { verifyToken } from '../middleware/verifyUser.js';
import { verifyCoodinator } from '../middleware/verifyManager.js';
import { findUserByStudentId, getCoordinatorCoupons, getCoordinatorData } from '../controller/coordinatorController.js';

const router = express()

router.get('/', verifyToken, verifyCoodinator, getCoordinatorData);
router.get('/coupons', verifyToken, verifyCoodinator, getCoordinatorCoupons);
router.get('/user', verifyToken, verifyCoodinator, findUserByStudentId);


export default router;