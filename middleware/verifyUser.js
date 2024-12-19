import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.cookies['token']

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
    try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
      req.userId = decoded.userId;
      req.userRole = decoded.userRole;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};