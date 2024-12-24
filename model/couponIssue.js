import mongoose from "mongoose";

const couponLeaves = new Array(50).fill(0);
const CouponIssueRegister = mongoose.Schema({
    issueId: {
        type: Number,
        required: true,
    },
    issuedTo: {
        type: Number,
        required: true
    },
    issuedBy: {
        type: Number,
        required: true
    },
    typeOfRegister: {
        type: Number,
        required: true,
        default: 0
    },
    couponNo: {
        type: Number,
        required: true
    },
    leaveStart: {
        type: Number,
        required: true
    },
    issuedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnedData: {
        type: Date,
        required: false
    },
    leaveEnd: {
        type: Number,
        required: true
    },
    couponLeaves: {
        type: [Number],
        required: true,
        default: couponLeaves
    },
    commision: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
})

const CouponRegister = mongoose.model('couponRegiester', CouponIssueRegister);

export default CouponRegister

// type 1 - to user
// type 2 - to coordinator