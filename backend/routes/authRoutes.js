const express = require("express");

const router = express.Router();

const authController = require(
    "../controllers/authController"
);

const protect = require(
    "../middleware/authMiddleware"
);

router.post(
    "/register",
    authController.register
);

router.post(
    "/login",
    authController.login
);

router.get(
    "/dashboard",
    protect,
    (req, res) => {
        res.status(200).json({
            message:
                "Welcome to the protected Dashboard",

            authenticatedUser: {
                userId: req.user.userId,
                email: req.user.email
            }
        });
    }
);

module.exports = router;