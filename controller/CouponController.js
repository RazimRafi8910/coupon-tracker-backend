import AppData from '../model/appData.js';
import User from '../model/users.js';
import CouponBook from '../model/couponBook.js';
import CouponIssue from '../model/couponIssue.js';

export const createCouponIssueRegister = async (req, res) => {
    try {
        const { studentId, bookNo,type,issuedBy } = req.body;
        if (!studentId || !bookNo) {
            return res.status(400).json({ success: false, message: "input missing or invalid input" });
        }

        const issueStudent = await User.findOne({ studentId });

        if(!issueStudent) {
            return res.status(400).json({ success: false, message: "Student not found" });
        }

        const issueBook = await CouponBook.findOne({ bookId:bookNo });

        if (!issueBook) {
            return res.status(400).json({ success: false, message: "Coupon book not found" });
        }

        if (issueBook.status === 1) {
            return res.status(400).json({ success: false, message: "Coupon book already issued" });
        }

        const appData = await AppData.findOne();

        if (!appData) {
            return res.status(400).json({ success: false, message: "Server error" });
        }

        let issueCommsion = 0;
        if (issueStudent.assignedCoupons >= 10) {
            issueCommsion = 1000
        } else if (issueStudent.assignedCoupons >= 7) {
            issueCommsion = 800
        } else if(issueStudent.assignedCoupons >= 4) {
            issueCommsion = 750
        } else if (issueStudent.assignedCoupons >= 1) {
            issueCommsion = 600
        }

        const couponIssueData = {
            issueId: appData.currentRegisterIssueId + 1,
            issuedTo: studentId,
            issuedBy,
            typeOfRegister: type,
            couponNo: issueBook.bookId,
            leaveStart: issueBook.leaveStart,
            leaveEnd: issueBook.leaveEnd,
            commision: issueCommsion,
            issuedDate: new Date(),
            returnDate: null,
            status: 0
        };

        const newCouponIssue = new CouponIssue(couponIssueData);
        await newCouponIssue.save();
        if(!newCouponIssue) {
            return res.status(400).json({ success: false, message: "Coupon Register not Created" });
        }

        const result1 = await AppData.findOneAndUpdate({}, { currentRegisterIssueId: appData.currentRegisterIssueId + 1 });
        const result2 = await User.findOneAndUpdate({ studentId }, { assignedCoupons: issueStudent.assignedCoupons + 1 });
        const result3 = await CouponBook.findOneAndUpdate({ bookId:bookNo }, { status: 1 });
        
        if (!result1 || !result2 || !result3) {
            return res.status(400).json({ success: false, message: "Server error" });
        }

        return res.status(201).json({success:true,message:"Coupon Register created",data:newCouponIssue});
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: error.message });
    }
};
