const Teacher = require('../Model/teachermodel');

// Create a new teacher profile
const createTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a teacher profile by id
const getTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ error: "Teacher not found" });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(404).json({ error: "Teacher not found" });
    }
};

// Update teacher profile
const updateTeacher = async (req, res) => {
    try {
        // Ensure only the user with matching ID can update
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ msg: "You are not authorized to update this profile" });
        }

        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!teacher) return res.status(404).json({ error: "Teacher not found" });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete teacher profile
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) return res.status(404).json({ error: "Teacher not found" });
        res.status(200).json({ message: "Teacher deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTeacher, getTeacher, updateTeacher, deleteTeacher };
