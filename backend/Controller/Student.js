const Student = require('../Model/student');

const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ msg: "Not authorized to update this profile" });
        }
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createStudent, getStudent, updateStudent, deleteStudent };
