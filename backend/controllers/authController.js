const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) => jwt.sign(
    { userId: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
);

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Full name, email and password are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({ message: "A user with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Registration successful",
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (error) {
        console.error("Registration error:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "A user with this email already exists" });
        }
        return res.status(500).json({ message: "The server could not register the user" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = createToken(user);
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "The server could not process the login" });
    }
};

const dashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "Dashboard loaded successfully",
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        return res.status(500).json({ message: "The server could not load the dashboard" });
    }
};

module.exports = { register, login, dashboard };
