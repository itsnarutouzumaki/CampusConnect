const Assignment = require("../Models/assignment");
const {cloudinary} =require('../utils/cloudinary');

// add assignment
const addAssignment = async (req, res) => {
  let { title, description, dueDate, courseId, userId, createdAt } = req.body;
  try {
    let assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course: courseId,
      user: userId,
      createdAt,
    });
    res.json({ message: "Assignment Added successfully", assignment });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// get all assignments
const getAssignment = async (req, res) => {
  let assignment = await Assignment.find().sort({ createdAt: -1 });
  res.json({ message: "all assignments", assignment });
};

// update an assignment
const updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      req.body,
      { new: true }
    );

    if (!assignment) {
      return res.json({ message: "assignment doesn't exist" });
    }

    return res.json({ message: "assignment updated successfully", assignment });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// delete an assignment
const deleteAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findByIdAndDelete(assignmentId);

    if (!assignment) {
      return res.json({ message: "assignement doesn't exist" });
    }

    return res.json({ message: "assignment deleted successfully", assignment });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// upload file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    // console.log(filePath);
    // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: "Assignment uploads",
    });
    // console.log("cloudinary response ",cloudinaryResponse);

    const file = cloudinaryResponse.secure_url;
    const assignmentId = req.params.id;
    res.json({message:"file_url ",file,assignmentId});
  
    // update the file URL
    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { file_url: file },  
      { new: true }
    );

    if (!assignment) {
      return res.json({ message: "Assignment doesn't exist" });
    }

    return res.json({
      message: "File uploaded successfully",
      file_url: file,
    });
  } catch (err) {
    return res.json({ message: "Failed to upload file", error: err.message });
  }
};

module.exports = {
  addAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  uploadFile
};
