const express = require('express');
const { createStudent, getStudent, updateStudent, deleteStudent } = require('../Controller/Student');
const {verifyToken} = require('../Middleware/Authentication');

const router = express.Router();

// Public route for creating a student profile
router.post('/create', createStudent);

// Protected routes with token verification middleware
router.get('/:id', verifyToken, getStudent);
router.put('/:id', verifyToken, updateStudent);
router.delete('/:id', verifyToken, deleteStudent);

module.exports = router;
