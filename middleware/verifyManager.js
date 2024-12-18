import jwt from 'jsonwebtoken'

export const verifyManager = (req, res, next) => {
    const userRole = req.userRole;
    if (!userRole) {
        return res.status(401).json({ success: false, message: 'user not found' })
    }

    if (userRole != 3) {
        return res.status(401).json({ success:false, message: "user is not Manager" })
    }
    next()
};