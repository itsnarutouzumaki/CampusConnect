const express = require ('express');
const {createStudent , getStudent , updateStudent , deleteStudent }= require ('../controllers/studentcontroller');
const router = express.Router();

router.post('/' , createStudent);
router.get('/:id',getStudent);
router.put('/:id', updateStudent);
router.delete('/:id',deleteStudent);

module.exports= router;
