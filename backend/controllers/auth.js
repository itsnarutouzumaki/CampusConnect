const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentmodel"); // Corrected to use "Student"

/* REGISTER USER */
const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            academicGoals,
            courseSchedule,
            progress
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            fullName,
            email,
            password: passwordHash,
            academicGoals,
            courseSchedule,
            progress
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        // const isMatch=(password===student.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
        
        const studentResponse = { ...student._doc }; // safely clone student data
        delete studentResponse.password;
        
        res.status(200).json({ token, user: studentResponse });
        console.log("yesss");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export both functions for use in routes
module.exports = { register, login };
