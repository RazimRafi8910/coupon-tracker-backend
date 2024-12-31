import CouponBook from '../model/couponBook.js';
import CouponRegister from '../model/couponIssue.js';
import CoordinatorRegister from '../model/coordinatorRegister.js';
import User from '../model/users.js';

export const getCoordinatorData = async (req, res, next) => {
    try {
        const user = req.user;
        const coupons = await CoordinatorRegister.findOne({ coordinaorId: user.userId }).countDocuments();

        const data = {
            couponsCount: coupons,
        };

        return res.status(200).json({ success: true, message: "success", data });
    } catch (error) {
        next(error)
    }
}

export const getCoordinatorCoupons = async (req, res,next) => {
    try {
        const user = await User.findOne({ _id: req.user.userId });
        const options = {
            coordinatorId: user.studentId
        }

        const coupons = await CoordinatorRegister.findOne(options).populate('couponsAssigend').lean();
        
        return res.status(200).json({ success: true, message: "coupons found", data: coupons });
    } catch (error) {
        next(error)
    }
}

export const findUserByStudentId = async (req, res, next) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).json({ success: true, message: "user not found" });
        }
        const users = await User.find({ name: { $regex: name, $options: 'i' } });
        return res.status(200).json({ success: true, message: "user found", data: users });
    } catch (error) {
        next(error);
    }
}