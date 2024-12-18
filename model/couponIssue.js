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
    couponNo: {
        type: Number,
        required: true
    },
    couponStarting: {
        type: Number,
        required: true
    },
    couponEnding: {
        type: Number,
        required: true
    },
    couponLeaves: {
        type: [Number],
        required: true,
        default: couponLeaves
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
})

const CouponRegister = mongoose.model('couponRegiester', CouponIssueRegister);

export default CouponRegister