const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMidddleware')

// controller
const {registerUser, loginUser, forgotPassword, resetPassword} = require('../controllers/userController')

// routes
router.post("/register", registerUser)
router.post('/login', loginUser)

router.get('/profile', protect, (req, res) => {
    res.json({
        success: true,
        message: "protected Route Accessed",
        user: req.user,
    })
})

// Forgot Password
router.post("/forgot-password", forgotPassword);
// reset password route
router.post('/reset-password/:token', resetPassword)

module.exports = router