import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true,
    },
    assignedCoupon: {
        type: Number,
        required: true,
        default:0
    },
    role: {
        type: [String],
        required: true,
        default:['user']
    },
    moneyCollected: {
        type: Number,
        required: true,
        default:0
    },
    clearedLeaves: {
        type: Number,
        required: true,
        default:0
    }
})

const User = mongoose.model('user', UserSchema)

export default User