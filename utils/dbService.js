import User from "../model/users.js"
import AppData from "../model/appData.js"

export const createUSer = async () => {
    try {
        const result = await User.create({
            username: 'manager',
            password: '1234',
            role: 3,
            name: 'razim',
            phone: 8848764715,
            email: '8910razim@gmail.com',
            dob: '06/10/2004',
            regNo: '50/bca/24',
            status: 1,
            studentId: 101,
            batch: '24-27',
            class: 'bca',
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}