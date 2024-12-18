import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    status: {
        type: Number,
        required:true
    },
    dob: {
        type: Date,
        required:true
    },
    studentId: {
        type: Number,
        required:true
    },
    batch: {
        type: String,
        required:true
    },
    class: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    regNo: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true,
    },
    assignedCoupons: {
        type: Number,
        required: true,
        default:0
    },
    role: {
        type: Number,
        required: true,
        default:1
    },
    moneyCollected: {
        type: Number,
        required: true,
        default:0
    }
})

const User = mongoose.model('user', UserSchema)

export default User