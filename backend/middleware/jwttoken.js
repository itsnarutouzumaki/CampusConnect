const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.auth_token; // Get token from cookies

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.student_id = decoded._id;
    req.body.studentId=decoded._id; 
    req.body.student_Id=decoded._id;
    req.body._id=decoded._id; // Attach user ID to request
    // Attach user ID to request
    req.params.studentId = decoded._id; // Attach user ID to request
    req.params.student_id = decoded._id; // Attach user ID to request
    req.params._id = decoded._id; // Attach user ID to request
    req.body.teacher_id=decoded._id; // Attach user ID to request 
    req.body.teacherId=decoded._id; // Attach user ID to request
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

const authenticateJWTForTeacher = (req, res, next) => {
  const token = req.cookies.auth_token; // Get token from cookies

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.teacher_id = decoded._id;
    req.body.teacherId=decoded._id; 
    req.body.teacher_Id=decoded._id;
    // Attach user ID to request
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { authenticateJWT,authenticateJWTForTeacher };
