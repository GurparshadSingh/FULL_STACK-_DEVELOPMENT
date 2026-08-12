exports.isAdmin = async (req, res, next) => {
    console.log("Inside Admin Middleware:", req.user);
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access Denied. Admin Only."
        });
    }
    next();
}