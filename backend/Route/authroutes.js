const express = require("express");
const { registerStudent, loginStudent, registerTeacher, loginTeacher } = require("../Controller/auth");
const router = express.Router();

// Student Routes
router.post("/register/student", registerStudent);
router.post("/login/student", loginStudent);

// Teacher Routes
router.post("/register/teacher", registerTeacher);
router.post("/login/teacher", loginTeacher);

module.exports = router;
