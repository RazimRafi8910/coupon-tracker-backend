
export const verifyManager = (req, res, next) => {
    const userRole = req.user.userRole;
    if (!userRole) {
        return res.status(401).json({ success: false, message: 'user not found' })
    }

    if (userRole != 3) {
        return res.status(401).json({ success:false, message: "user is not Manager" })
    }
    next()
};

export const verifyCoodinator = (req, res, next) => {
    const userRole = req.user.userRole;
    if (!userRole) {
        return res.status(401).json({ success: false, message: "user not found" });
    }

    if (userRole !== 2) {
        return res.status(401).json({ success: false, message: "User is not Coordinator" });
    }

    next()
}