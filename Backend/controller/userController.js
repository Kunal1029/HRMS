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

    user.password = undefined;
    res.status(200).json({
        success: true,
        message: "Login successful (expires in 1 minute)",
        user: user,
        expiresIn: "1 minute"
    });
});

exports.editHr = asyncHandler(async (req, res) => {
    const data = req.body;
    const { email, password, ...newData } = data
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findOneAndUpdate(
        { email },
        { $set: { ...newData, password: hashedPassword, updatedAt: Date.now() } },
        { new: true, select: '-password' }
    )

    if (!updateUser) {
        throw new CustomError("User not found", 404);
    }

    res.status(200).json({ success: true, message: "Hr updated Successfully", data: updateUser })
})

exports.logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        sameSite: "Strict"
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
});

exports.getUserInfo = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, user });
});


exports.protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    // console.log("protect ", token)
    if (!token) return next(new CustomError("Not authorized", 401));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            throw new CustomError("User no longer exists", 401);
        }
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new CustomError("Token expired. Please login again", 401);
        }
        throw new CustomError("Invalid token. Please login again", 401);
    }
});

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError("Email and Password are required", 400)
    }

    const isUser = await User.findOne({ email })

    if (!isUser) {
        throw new CustomError("Invalid Credentials: User not found", 404)
    }

    const isMatch = await bcrypt.compare(password, isUser.password)


    if (!isMatch) {
        throw new CustomError("Invalid Credentials: Incorrect password", 401)
    }

    next();
})

exports.checkTokenStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        throw new CustomError("No token found", 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - now;
        
        if (timeLeft <= 0) {
            throw new CustomError("Token has expired", 401);
        }

        res.status(200).json({
            success: true,
            data: {
                userId: decoded.userId,
                role: decoded.role,
                timeRemainingSeconds: timeLeft,
                expiresAt: new Date(decoded.exp * 1000).toLocaleString(),
                isExpiringSoon: timeLeft < 60
            }
        });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new CustomError("Token has expired", 401);
        }
        throw new CustomError("Invalid token", 401);
    }
});