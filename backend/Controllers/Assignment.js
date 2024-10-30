const Assignment = require("../Models/assignment");

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
  let assignment = await Assignment.find().sort({createdAt:-1});
  res.json({message:"all assignments",assignment});
};

module.exports = { addAssignment, getAssignment };
