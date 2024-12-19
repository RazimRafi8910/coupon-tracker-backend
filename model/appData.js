import mongoose from "mongoose";

const appData = mongoose.Schema({
    currentStudentId: {
        type: Number,
        required: true,
        default: 200,
    },
    currentStaffId: {
        type: Number,
        required: true,
        default: 100,
    },
    currentBookId: {
        type: Number,
        required: true,
        default: 1000,
    },
    currentRegisterIssueId: {
        type: Number,
        required: true,
        default: 10000,
    },
})

const AppData = mongoose.model('appData', appData);
export default AppData