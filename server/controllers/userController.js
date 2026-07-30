// import packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// register user
//POST /api/users/register

const registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // check if all fields are available
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login controller
// POST /api/users/login
const loginUser = async (req, res) => {
  try {
    // get email, and password from request body
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // send success response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash the token before storing it
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // save hashed token
    user.resetPasswordToken = hashedToken;

    // token expires after 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    // save changes
    await user.save();

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    // Email subject
    const subject = "Password Reset Request";
    // Email subject
    const html = `
      <h2>Password Reset</h2>

      <p>Hello ${user.name},</p>

      <p>Click the link below to set a new password.</p>

      <a href="${resetURL}">Reset Password</a>

      <p>This link will expire in 15 minutes.</p>

      <p>If you didn't requested this, please ignore this email.</p>
    `;

    await sendEmail({
      to: user.email,
      subject,
      html,
    });

    res.status(200).json({
      success: true,
      message: "password reset link sent to your registered email acount",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  console.log("Inside resetPassword");
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("Token", token);
    console.log("Password", password);

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log("Hashed Token", hashedToken);

    // search for user whose token matches the hashed token and not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    res.status(200).json({
      success: true,
      message: "controller reached",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
