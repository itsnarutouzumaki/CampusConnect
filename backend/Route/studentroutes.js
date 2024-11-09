const express = require ('express');
const {createStudent , getStudent , updateStudent , deleteStudent }= require ('../controllers/studentcontroller');
const router = express.Router();
const verifyToken = require('../middleware/auth');

console.log(createStudent,getStudent,updateStudent,deleteStudent);
// public route for creating a student 
router.post('/create' , createStudent);

// protected routes
router.get('/:id',verifyToken, getStudent);
router.put('/:id',verifyToken, updateStudent);
router.delete('/:id',verifyToken ,deleteStudent);

module.exports= router;
