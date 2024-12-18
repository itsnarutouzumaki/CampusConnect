const express = require('express');
const { createTeacher, getTeacher, updateTeacher, deleteTeacher } = require('../Controller/teachercontroller');
const router = express.Router();
const { verifyToken, verifyTeacherToken } = require('../Middleware/Authentication');

// Public route for creating a teacher profile
router.post('/', createTeacher);

// Protected routes specifically for teachers
router.get('/:id', verifyTeacherToken, getTeacher);
router.put('/:id', verifyTeacherToken, updateTeacher);
router.delete('/:id', verifyTeacherToken, deleteTeacher);

module.exports = router;
