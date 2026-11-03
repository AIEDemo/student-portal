const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        const token = header.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired authentication token" });
    }
};

module.exports = protect;
