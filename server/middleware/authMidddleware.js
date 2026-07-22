// import jwt
const jwt = require('jsonwebtoken')

// Authentication middleware
// verifies JWT before allowing access to protected routes

const protect = async (req, res, next) => {
    try {
        // get authorization header
        const authHeader = req.headers.authorization

        // check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token Provided"  //252561
            })
        }

        // extract token
        const token = authHeader.split(" ")[1]

        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // store user info in request
        req.user = decoded
        console.log(decoded)
        console.log(req.user)
        // continue
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        })
    }
}

module.exports = protect