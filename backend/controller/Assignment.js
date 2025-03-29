const Assignment=require('../models/assignmentSchema');

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


// Upload File
const uploadFile = (req, res) => {
    // console.log('File received:', req.file); // Debugging

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    
    uploadedFile = req.file.path;  

    return res.status(200).json({
        message: 'File uploaded successfully',
        url: uploadedFile
    });
};


//  Submit Assignment
const submitAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const { fileUrl } = req.body; 
    // console.log(assignmentId, url); 
    if (!assignmentId || !fileUrl) {
        return res.status(400).json({ message: 'Assignment ID and file URL are required' });
    }

    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { fileUrl, isSubmitted: true, submittedAt: new Date() },
            { new: true }
        );

        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json({
            message: 'Assignment submitted successfully!',
            assignment: updatedAssignment
        });

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

        res.status(200).json({
            message: 'Assignment found',
            fileUrl: assignment.fileUrl
        });
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