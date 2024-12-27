import mongoose from 'mongoose';


const coordinatorRegistserSchema = mongoose.Schema({
    coordinatorId: {
        type: String,
        required: true
    },
    stutus: {
        type: Number,
        required: true,
        default: 1,
    },
    dueAmount: {
        type: Number,
        required: true,
        default: 0
    },
    collectedAmount: {
        type: Number,
        required: true,
        default: 0
    },
    recivedAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    couponsAssigend: [{
        type: mongoose.Types.ObjectId,
        ref: 'couponBook',
        default: []
    }],
    couponIssueRegister: [{
        type: mongoose.Types.ObjectId,
        ref: 'couponRegiester',
        default: [],
    }],
});

const CoordinatorRegister = mongoose.model('coordinatorRegister', coordinatorRegistserSchema);

export default CoordinatorRegister