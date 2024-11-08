const jwt = require('jsonwebtoken');

// Middleware to verify any user token (students and teachers)
const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        // Remove 'Bearer ' prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Middleware to verify teacher token specifically
const verifyTeacherToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        // Remove 'Bearer ' prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user role is "teacher"
        if (verified.role !== "teacher") {
            return res.status(403).send("Access Denied: Teacher only");
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { verifyToken, verifyTeacherToken };
