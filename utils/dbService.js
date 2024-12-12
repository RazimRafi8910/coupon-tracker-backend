import User from "../model/users.js"

export const createUSer = async () => {
    try {
        const result = await User.create({ username: 'razim2', password: '1234',role:['user','coordinator'] })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}