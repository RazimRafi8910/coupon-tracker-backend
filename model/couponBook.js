import mongoose from "mongoose";


const CouponBookSchema = mongoose.Schema({
    bookId: {
        type: Number,
        required:true
    },
    bookNo: {
        type: Number,
        required: false
    },
    leaveStart: {
        type: Number,
        required: true
    },
    leaveEnd: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
});

const CouponBook = mongoose.model('couponBook', CouponBookSchema);

export default CouponBook


// status 1 - assiged
// stauts 2 - completed
// status 3 - payment recived