import CouponBook from '../model/couponBook.js'
import CouponRegister from '../model/couponIssue.js';
import User from '../model/users.js'


//manager dashboard
export const managerDashboard = async (req, res) => {
    try {
        const students = await User.find({ role: 1 }).countDocuments();
        const couponBooks = await CouponBook.find().countDocuments();
        const couponRegisters = await CouponRegister.find().countDocuments();

        return res.status(200).json({ success: true, message: "dashboard data founded", data: { students, couponBooks, couponRegisters } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
//coupons
export const couponsData = async (req, res) => {
    try {
        const coupondata = await CouponBook.find().limit(30);

        return res.status(200).json({ success: true, message: "coupon data founded", data: coupondata });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"internal server error"})
    }
}

export const searchCouponByNo = async (req, res) => {
    try {
        const bookNo = req.params.search_no;
        if (!bookNo) {
            return res.status(400).json({ success: false, message: "book number not found or invalid" });
        }

        const book = await CouponBook.find({ bookId: bookNo });

        if (!book[0]) {
            return res.status(400), json({ success: false, message: "not found Coupon" });
        }

        return res.status(200).json({ success: true, message: "Coupon Found", data: book });
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"internal server error"})
    }
}

export const addCoupons = async (req,res) => {
    try {
        const { bookId, leaveStart, leaveEnd } = req.body;
        if (!bookId || !leaveEnd || !leaveStart) {
            return res.status(400).json({ sucess: false, message: "input missing or invalid input" })
        }
            const existingBook = await CouponBook.find({ bookId });
            if (existingBook[0]) {
                console.log(existingBook)
                return res.status(400).json({ success: false, message: "Coupon already exists with same bookid" })
            }
            const newCoupon = await CouponBook.create({
                status: 0,
                bookId,
                leaveStart,
                leaveEnd,
            });
            if (!newCoupon) {
                return res.status(409).json({ success: false, message: "failed create" });
            }
        return res.status(200).json({ success: true, message: "Coupon created sucessfuly", newCoupon })
        
    } catch (error) {
        console.log(error)
            res.status(500).json({success:false, message:"internal server error"})
    }
}


//students
export const studentsData = async (req, res) => {
    try {
        const students = await User.find({role : 1}).limit(25)
        if (!students) {
            return res.status(404).json({ success: false, message: "students not found" });
        }

        return res.status(200).json({success:true,message:"students data founded",data:students})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"internal server error"})
    }
}

export const studentSearch = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ success: false, message: "student id not found or invalid" });
        }

        const users = await this.UserModel.find({ name: { $regex: name, $options: 'i' } });

        if (!users[0]) {
            return res.status(400), json({ success: false, message: "no matching name found" });
        }

        return res.status(200).json({ success: true, message: "student Found", data: student });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const studentDetails = async (req, res) => {
    try {
        const studentId = req.params.studentid;
        if (!studentId) {
            return res.status(400).json({ success: false, message: "student id not found or invalid" });
        }

        let student = await User.findOne({ studentId }).lean();

        if (!student) {
            return res.status(400), json({ success: false, message: "not found student" });
        }

        const studentCouponRegister = await CouponRegister.find({ issuedTo: student.studentId });
        
        if (studentCouponRegister) {
            student = {
                ...student,
                register:studentCouponRegister
            }
        }

        return res.status(200).json({ success: true, message: "student Found", data: student });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}