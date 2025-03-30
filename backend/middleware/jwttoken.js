const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.auth_token; // Get token from cookies

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student_id = decoded._id; // Attach user ID to request
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { authenticateJWT };
