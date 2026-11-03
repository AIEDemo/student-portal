const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require(
    "./routes/authRoutes"
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message:
            "Student Portal API is running"
    });
});

app.use(
    "/api/auth",
    authRoutes
);

const startServer = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            "MongoDB connected successfully"
        );

        app.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();