
const handleError = (error, req, res, next) => {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
}

export default handleError