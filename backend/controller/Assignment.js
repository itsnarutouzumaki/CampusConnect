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

module.exports = {
    addAssignment,
    getAllAssignments,
    editAssignment
}