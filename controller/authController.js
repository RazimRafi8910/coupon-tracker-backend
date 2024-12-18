import User from "../model/users.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            return res
                .status(422)
                .json({ error: true, message: "required cretentials" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not found",success:false, auth: false, manager: false });
        }

        if (password != user.password) {
            return res
                .status(401)
                .json({success:false, message: "invalid password", auth: false, manager: false });
        }

        if (role > 1 && role !== user.role) {
            return res.status(401).json({ success:false, message: "role does not match", auth: false });
        }

        const jwtPayload = {
            userId: user._id,
            username: user.username,
            userRole: user.role,
        };
        const token = jwt.sign(jwtPayload, process.env.JWT_KEY, {
            expiresIn: "60d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 60,
            sameSite: "lax",
            secure: false,
        });

        const responseUser = {
            username,
            role: user.role,
        };

        // if (user.role.includes('manager') || user.role.includes('coordinator')) {
        //     return res.status(200).json({ message: "login success", auth: true, manager: true , responseUser,token })
        // }

        return res.status(200).json({
            message: "login success",
            success: true,
            auth: true,
            manager: false,
            responseUser,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unautherized" });
    }
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ success: true, message: "user logout success" });
};

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, responseUser: user });
    } catch (error) {
        console.log(error);
    }
};
