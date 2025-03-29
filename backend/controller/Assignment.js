const Assignment=require('../models/assignmentSchema');
let uploadedFile = null;

// add an assignment
const addAssignment = async (req, res) => {
    const { title, url, dueDate, course } = req.body;
    try {
        const assignment = await Assignment.create({ title, url, dueDate, course });
        return res.json({ status: 'success', message: 'Assignment created successfully', assignment });
    } catch (err) {
        return res.json({ status: 'failure', message:err.message });
    }
}

// get all assignments
const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        return res.json({ status: 'success', message: 'All Assignments fetched successfully', assignments });
    } catch (err) {
        console.error(err);
        return res.json({ status: 'failure', message: err.message });
    }
}

// edit an assignment
const editAssignment = async (req, res) => {
    const { id } = req.params;
    const { title, url, dueDate, course } = req.body;
    try {
        const assignment = await Assignment.findByIdAndUpdate(id, { title, url, dueDate, course }, { new: true });
        return res.json({ status: 'success', message: 'Assignment updated successfully', assignment });
    } catch (err) {
        return res.json({ status: 'failure', message: err.message });
    }
}


//  Upload File 
const uploadFile = (req, res) => {
    console.log('File received:', req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    uploadedFile = req.file.path;

    res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: uploadedFile
    });
};

//  Submit Assignment
const submitAssignment = async (req, res) => {
    const { title, course } = req.body;

    if (!title || !course || !uploadedFile) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAssignment = new Assignment({
            title,
            course,
            url: uploadedFile
        });

        await newAssignment.save();
        uploadedFile = null;

        res.status(201).json({
            message: 'Assignment submitted successfully!',
            assignment: newAssignment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error saving assignment', error });
    }
};

//  View Assignment
const viewAssignment = (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ message: 'File URL is required' });
    }

    res.redirect(url);
};

module.exports = {
    addAssignment,
    getAllAssignments,
    editAssignment,
    uploadFile,
    submitAssignment,
    viewAssignment
}