const Assignment=require('../models/assignmentSchema');
const response= require('../utils/apiresponse');
const uploadedFile=null;
const mongoose = require('mongoose');

// add an assignment
const addAssignment = async (req, res) => {
    const { title, url, dueDate, course } = req.body;
    try {
        const assignment = await Assignment.create({ title, url, dueDate, course });
        return res.json(new response(200,assignment,'assignment created successfully'));
    } catch (err) {
        return res.json({ status: 'failure', message:err.message });
    }
}

// get all assignments
const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        return res.json(new response(200,assignments,'all assignments fetched successfully'));
    } catch (err) {
        // console.error(err);
        return res.json({ status: 'failure', message: err.message });
    }
}

// edit an assignment
const editAssignment = async (req, res) => {
    const id=new mongoose.Types.ObjectId(req.body.assignment_id);
    try {
       const assignment=await Assignment.findOneAndUpdate({_id:id},
        {$set:req.body},
        {new:true}
       );
        return res.json(new response(200,assignment,'assignment updated successfully'));
    } catch (err) {
        return res.json({ status: 'failure', message: err.message });
    }
}


// Upload File
const uploadFile = (req, res) => {
    // console.log('File received:', req.file); // Debugging

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    
    uploadedFile = req.file.path;  

    return res.json(new response(200,{url: uploadedFile},'image uploaded successfully'));
};


//  Submit Assignment
const submitAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { fileUrl } = req.body; 
    // console.log(assignmentId, url); 
    if (!assignmentId || !fileUrl) {
        return res.json({ message: 'Assignment ID and file URL are required' });
    }

    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { fileUrl, isSubmitted: true, submittedAt: new Date() },
            { new: true }
        );

        if (!updatedAssignment) {
            return res.json({ message: 'Assignment not found' });
        }

        return res.json(new response(200,{assignment: updatedAssignment},'Assignment submitted successfully!'));

    } catch (error) {
        // console.log('Error submitting assignment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//  View Assignment
const viewAssignment = async (req, res) => {
    const { assignmentId } = req.params;

    try {
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment || !assignment.fileUrl) {
            return res.status(404).json({ message: 'Assignment or file not found' });
        }

        res.json(new response(200,{fileUrl: assignment.fileUrl},'Assignment found'));
    } catch (error) {
        // console.error('Error fetching assignment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addAssignment,
    getAllAssignments,
    editAssignment,
    uploadFile,
    submitAssignment,
    viewAssignment
}