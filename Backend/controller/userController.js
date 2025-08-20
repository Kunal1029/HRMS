const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const { asyncHandler } = require("../utils/middleware");

exports.registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new CustomError("Email already registered", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role,
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId: user._id,
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError("Invalid credentials", 400);

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: "Strict",
    });

    res.status(200).json({ success: true, message: "Login successful"});  
});

exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

exports.protect = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(new CustomError("Not authorized", 401));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store payload
        next();
    } catch (err) {
        next(new CustomError("Token expired or invalid", 401));
    }
};

exports.getUserInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) throw new CustomError("User not found", 404);

    res.status(200).json({ success: true, user });
});
