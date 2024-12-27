import AppData from '../model/appData.js';
import CouponBook from '../model/couponBook.js'
import CouponRegister from '../model/couponIssue.js';
import CoordinatorRegister from '../model/coordinatorRegister.js';
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
export const addStudent = async (req, res) => {
    try {
        const { name, role, studentClass, batch, email, dob, regNo, username, phone } = req.body
        if (!name || !role || !studentClass || !batch || !email || !dob || !regNo || !username || !phone) {
            return res.status(400).json({ success: false, messae: "Invalid input" })
        }
        
        const exisitStudent = await User.find({ username, email });
        console.log(exisitStudent)

        if (exisitStudent[0]) {
            return res.status(400).json({ success: false, message: "already student exist with same email or username" })
        }

        const currentAppData = await AppData.findOne();

        const studentId = currentAppData.currentStudentId + 1
        const newStudent = await User.create({
            username,
            password: regNo,
            role,
            name,
            phone,
            email,
            dob,
            regNo,
            status: 1,
            studentId,
            batch,
            class: studentClass
        })

        if (!newStudent) {
            return res.status(409).json({ success: false, messsage: "Student not created" })
        }

        await AppData.findOneAndUpdate({}, { currentStudentId: currentAppData.currentStudentId + 1 });

        return res.status(200).json({ success: true, message: "Student created", data: newStudent })

    } catch (error) {
        console.log(error)
    }
}

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


//coordinator
export const coordinatorData = async (req, res) => {
    try {
        const coordinators = await User.find({ role: 2 }).limit(30)
        return res.status(200).json({ success: true, message: "coordinators Found", data: coordinators });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const coordinatorDetails = async (req, res) => {
    try {
        const studentId = req.params.coordinatorId
        if (!studentId) {
            return res.stauts(409).json({ success: false, message: "coordinator Id not found" });
        }

        const coordinator = await User.findOne({ studentId,role:2 }).lean()

        if (!coordinator) {
            return res.status(404).json({ success: false, message: "Coordinator not found" });
        }

        const result = await CoordinatorRegister.findOne({ coordinatorId: studentId }).populate('couponsAssigend')
        

        const coordinatorRegister = await CouponRegister.aggregate([
            { $match: {issuedBy:Number(studentId)} },
            {
                $lookup: {
                    from: 'users',
                    localField: 'issuedTo',
                    foreignField: 'studentId',
                    as:'issuedToUser'
                }
            },
            { $unwind: '$issuedToUser' }
        ])

        const data = {
            ...coordinator,
            coordinatorRegister: result,
            register:coordinatorRegister
        }

        return res.status(200).json({ success: true, message: "Coordinator founded", data })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const assignCouponToCoordinator = async(req, res) =>{
    try {
        const coordinatorId = req.params.coordinatorId;
        const { bookNo } = req.body;
        if (!coordinatorId || !bookNo) {
            return res.status(409).json({ sucess: false, message: "Invalid or missing input" });
        }
        const coordinator = await User.findOne({ studentId: coordinatorId });
        const couponBook = await CouponBook.findOne({ bookId: bookNo });

        if (!coordinator || !couponBook) {
            return res.status(409).json({ success: false, message: "Coupon not assigned!, Invalid Inputs" });
        }
        
        if (couponBook.status !== 0) {
            return res.status(400).json({ sucess: false, message: "Coupon is already assigned" });
        }

        let register = await CoordinatorRegister.findOne({ coordinatorId });
        
        if (!register) {
            register = await CoordinatorRegister.create({
                coordinatorId,
                couponsAssigend: [couponBook._id]
            }); 
        } else {
            const couponsAssigend = register.couponsAssigend;
            couponsAssigend.push(couponBook._id);
            register = await CoordinatorRegister.updateOne({ coordinatorId }, { couponsAssigend });
        };

        await CouponBook.updateOne({ _id: couponBook._id }, { status:1 } );
        

        return res.status(200).json({ success: true, message: "Coupons assigned", data: register });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

export const updateRecivedamount = async (req, res) => {
    try {
        const coordinatorId = req.params.coordinatorId;
        const { amount } = req.body;
        console.log(amount)
        if (!coordinatorId || !amount) {
            return res.status(400).json({ success: false, message: "invalid or missing Input" });
        }

        const coordinatorRegister = await CoordinatorRegister.findOneAndUpdate({ coordinatorId },{ $inc:{recivedAmount : amount}});

        if (!coordinatorRegister) {
            return res.status(409).json({ success: false, message: "Coordinator Register not found" });
        }


        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}