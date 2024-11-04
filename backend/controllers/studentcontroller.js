const Student = require ('../models/studentmodel');

// create a new student profile 
const createStudent = async (req,res) => {
    try {
        const student = new Student (req.body);
        await student.save();
        res.status(201).json(student);
    }
    catch (error) {
        res.status(400).json({error : error.message});
    }
};

// Get a student profile by id 
const getStudent = async (req,res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json(student);
    }
    catch (error) {
        res.status(404).json({error: "Student not found"});
    }
};

//update student profile 
const updateStudent = async (req,res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id , req.body, {new:true});
        res.status(200).json(student);
    }
    catch (error) {
        res.status(400).json({error : error.message});
    }
};

//Delete student profile 
const deleteStudent = async (req,res ) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Student deleted "});
    }
    catch (error) {
        res.status(400).json({error : error.message});
    }
};
module.exports={createStudent , getStudent , updateStudent , deleteStudent};