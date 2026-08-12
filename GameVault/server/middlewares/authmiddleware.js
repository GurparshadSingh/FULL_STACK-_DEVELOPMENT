const jwt = require("jsonwebtoken");
exports.protect = async (req, res, next) => {
    try {
        // console.log(req.user);
        // console.log(req.headers);
        // console.log(req.headers.authorization);
        // const authHeader = req.headers.authorization;

        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Access Denied. No Token Provided."
        //     });
        // }
        // const token = authHeader.split(" ")[1];
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log("decoded", decoded);

        // Store user info in request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }

}

