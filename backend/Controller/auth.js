const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../Model/studentmodel");
const Teacher = require("../Model/teachermodel");

/* REGISTER STUDENT */
const registerStudent = async (req, res) => {
    try {
        const { fullName, email, password, academicGoals, courseSchedule, progress } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            fullName,
            email,
            password: passwordHash,
            academicGoals,
            courseSchedule,
            progress,
            role: "student"
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

/* REGISTER TEACHER */
const registerTeacher = async (req, res) => {
    try {
        const { fullName, email, password, designation, qualification, areaOfInterest, bio, courses } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newTeacher = new Teacher({
            fullName,
            email,
            password: passwordHash,
            designation,
            qualification,
            areaOfInterest,
            bio,
            courses,
            role: "teacher"
        });

        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN STUDENT */
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email, role: "student" });
        if (!student) {
            return res.status(400).json({ msg: "Student does not exist" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET);
        res.status(200).json({ token, user: { email: student.email, role: "student" } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN TEACHER */
const loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;

        const teacher = await Teacher.findOne({ email, role: "teacher" });
        if (!teacher) {
            return res.status(400).json({ msg: "Teacher does not exist" });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: teacher._id, role: "teacher" }, process.env.JWT_SECRET);
        
        const teacherResponse = { ...teacher._doc };
        delete teacherResponse.password;
        
        res.status(200).json({ token, user: teacherResponse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export all functions
module.exports = { registerStudent, loginStudent, registerTeacher, loginTeacher };
