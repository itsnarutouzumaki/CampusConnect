const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) return res.status(403).send("Access Denied");

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

const verifyTeacherToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
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
