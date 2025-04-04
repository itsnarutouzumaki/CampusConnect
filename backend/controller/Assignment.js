const Assignment = require("../models/assignmentSchema");
const response = require("../utils/apiresponse");
let uploadedFile = null;
const mongoose = require("mongoose");
const studentAssignment = require("../models/studentAssignemnt");
const cloudinary = require("../config/cloudinary");
const teacherschema = require("../models/teacherschema");
// add an assignment
const addAssignment = async (req, res) => {
  const { title, url, dueDate, course } = req.body;
  try {
    const assignment = await Assignment.create({ title, url, dueDate, course });
    return res.json(
      new response(200, assignment, "assignment created successfully")
    );
  } catch (err) {
    return res.json({ status: "failure", message: err.message });
  }
};
// get all assignments
const getAllAssignments = async (req, res) => {
  const courseId = new mongoose.Types.ObjectId(req.body.courseId);
  const studentId = new mongoose.Types.ObjectId(req.body.studentId);
  try {
    const finaldata = [];
    const assignments = await Assignment.find({ course: courseId });
    for (let i = 0; i < assignments.length; i++) {
      const assignmentId = new mongoose.Types.ObjectId(assignments[i]._id);

      const findstudent = await studentAssignment.findOne({
        assignment: assignmentId,
        student: studentId,
      });
      if (findstudent) {
        finaldata.push({ ...assignments[i]._doc, iscompleted: true });
      } else {
        finaldata.push({ ...assignments[i]._doc, iscompleted: false });
      }
    }
    return res.json(
      new response(200, finaldata, "all assignments fetched successfully")
    );
  } catch (err) {
    return res.json({ status: "failure", message: err.message });
  }
};
// edit an assignment
const editAssignment = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.assignment_id);
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.json(
      new response(200, assignment, "assignment updated successfully")
    );
  } catch (err) {
    return res.json({ status: "failure", message: err.message });
  }
};
// Upload File
const uploadFile = (req, res) => {
  console.log("File received:", req.file); // Debugging

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  uploadedFile = req.file.path;
  return res.json(
    new response(200, { url: uploadedFile }, "image uploaded successfully")
  );
};

// Extract Public ID from URL
function extractPublicId(url) {
  const regex = /\/v\d+\/(.+?)\.\w+$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

//  Submit Assignment
const submitAssignment = async (req, res) => {
<<<<<<< Updated upstream
  const { assignmentId1, studentId1, fileUrl } = req.body;
  const studentId = new mongoose.Types.ObjectId(studentId1);
  const assignmentId = new mongoose.Types.ObjectId(assignmentId1);
  if (!assignmentId) {
    return res.json({ message: "Assignment ID required" });
  }

  if (!studentId) {
    return res.json({ message: "student ID required" });
  }
  if (!fileUrl) {
    return res.json({ message: "file url required" });
  }
  const isPresent = await studentAssignment.findOne({
    assignment: assignmentId,
    student: studentId,
  });
  if (isPresent?.fileUrl) {
    const publicId = extractPublicId(isPresent.fileUrl);
    //      console.log(publicId);
    const deletefile = await cloudinary.uploader.destroy(publicId);
    if (deletefile.result != "ok") {
      return res
        .status(400)
        .json({ message: "Failed to delete the old file from Cloudinary." });
=======
    const { assignmentId1,studentId1,fileUrl } = req.body; 
   const studentId=new mongoose.Types.ObjectId(studentId1);
    const assignmentId=new mongoose.Types.ObjectId(assignmentId1);
    if (!assignmentId ) {
        return res.json({ message: 'Assignment ID required' });
>>>>>>> Stashed changes
    }
  }

<<<<<<< Updated upstream
  try {
    const assignment = await studentAssignment.create({
      assignment: assignmentId,
      student: studentId,
      fileUrl: fileUrl,
    });
    if (!assignment) {
      return res.json({ message: "Assignment not found" });
=======
    if (!studentId ) {
        return res.json({ message: 'student ID required' });
    }
    if (!fileUrl ) {
        return res.json({ message: 'file url required' });
    }
    const isPresent= await studentAssignment.findOne({assignment:assignmentId,student:studentId});
    if(isPresent?.fileUrl){
        const publicId=extractPublicId(isPresent.fileUrl);
        console.log(publicId);
        const deletefile=await cloudinary.uploader.destroy(publicId);
        if (deletefile.result != 'ok') {
            return res.status(400).json({ message: 'Failed to delete the old file from Cloudinary.' });
        }
    }

    try {
        const assignment=await studentAssignment.create({assignment:assignmentId,student:studentId,fileUrl:fileUrl});

        if (!assignment) {
            return res.json({ message: 'Assignment not found' });
        }

        return res.json(new response(200,assignment,'Assignment submitted successfully!'));

    } catch (error) {
        // console.log('Error submitting assignment:', error);
        res.json({ message: 'Server error', error: error.message });
>>>>>>> Stashed changes
    }
    return res.json(
      new response(200, assignment, "Assignment submitted successfully!")
    );
  } catch (error) {
    // console.log('Error submitting assignment:', error);
    res.json({ message: "Server error", error: error.message });
  }
};
const viewAssignmentByTeacher = async (req, res) => {
  const courseId = new mongoose.Types.ObjectId(req.body.courseId);
  const data = await Assignment.find({ course: courseId });
  return res.json(new response(200, { data }, "Assignment found"));
};
//  View Assignment
const viewAssignment = async (req, res) => {
  const assignmentId = new mongoose.Types.ObjectId(req.body.assignment_id);
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment || !assignment.fileUrl) {
      return res.status(404).json({ message: "Assignment or file not found" });
    }

    res.json(
      new response(200, { fileUrl: assignment.fileUrl }, "Assignment found")
    );
  } catch (error) {
    // console.error('Error fetching assignment:', error);
    res.json({ message: "Server error", error: error.message });
  }
};

// delete Assignment
const deleteAssignment = async (req, res) => {
  const assignmentId = new mongoose.Types.ObjectId(req.body.id);
  try {
    const assignment = await Assignment.findByIdAndDelete({
      _id: assignmentId,
    });
    console.log(assignment);
    if (!assignment) {
      return res.json(new response(400, {}, "Assignment not found"));
    }
    return res.json(
      new response(200, assignment, "Assignment deleted successfully")
    );
  } catch (err) {
    res.json(new response(500, err, "Server error"));
  }
};

module.exports = {
  addAssignment,
  getAllAssignments,
  editAssignment,
  uploadFile,
  submitAssignment,
  viewAssignment,
  deleteAssignment,
  viewAssignmentByTeacher,
};
