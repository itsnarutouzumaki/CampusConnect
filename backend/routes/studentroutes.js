const express = require ('express');
const {createStudent , getStudent , updateStudent , deleteStudent }= require ('../Controllers/studentcontroller');
const router = express.Router();
const verifyToken = require('../middleware/auth');


// public route for cresting a student 
router.post('/' , createStudent);

// protected routes
router.get('/:id',verifyToken, getStudent);
router.put('/:id',verifyToken, updateStudent);
router.delete('/:id',verifyToken ,deleteStudent);

module.exports= router;
