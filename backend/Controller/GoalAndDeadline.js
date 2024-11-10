const Students = require("../Model/student");

// Add a study goal
const addGoal = async (req, res) => {
  try {
    const studentId = req.params.id;
    const goalData = req.body;
    const student = await Students.findById(studentId);

    if (!student) {
      return res.json({ message: "Student doesn't exist" });
    }
    student.studyGoal.push(goalData);
    await student.save();
    return res.json({ message: "Goal added successfully", goalData });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Get all study goals
const getGoal = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Students.findById(studentId);

    if (!student) {
      return res.json({ message: "Student doesn't exist" });
    }

    const sortedGoals = student.studyGoal.sort((a, b) => b.createdAt - a.createdAt);
    return res.json({ message: "All study goals:", goals: sortedGoals });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Delete a study goal
const deleteGoal = async (req, res) => {
    try {
      const { studentId, goalId } = req.params;
      const student = await Students.findById(studentId);
  
      if (!student) {
        return res.json({ message: "Student doesn't exist" });
      }
  
      // Find the goal to be deleted
      const deletedGoal = student.studyGoal.find(goal => goal._id.toString() === goalId);
      if (!deletedGoal) {
        return res.json({ message: "Goal not found" });
      }
  
      // Filter out the goal from the student's study goals
      student.studyGoal = student.studyGoal.filter(goal => goal._id.toString() !== goalId);
  
      // Save the student document after deleting the goal
      await student.save();
  
      // Ensure that the goal is actually deleted
      const updatedStudent = await Students.findById(studentId); // Fetch updated student
  
      if (!updatedStudent.studyGoal.find(goal => goal._id.toString() === goalId)) {
        return res.json({ message: "Goal deleted successfully", deletedGoal });
      } else {
        return res.json({ message: "Failed to delete goal" });
      }
    } catch (err) {
      return res.json({ message: err.message });
    }
  };
  

// Add an upcoming deadline
const addDeadline = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deadlineData = req.body;

    const student = await Students.findById(studentId);
    if (!student) {
      return res.json({ message: "Student doesn't exist" });
    }

    student.upcomingDeadline.push(deadlineData);
    await student.save();
    return res.json({ message: "Upcoming deadline added successfully", deadlineData });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Get all upcoming deadlines
const getDeadline = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Students.findById(studentId);

    if (!student) {
      return res.json({ message: "Student doesn't exist" });
    }

    const sortedDeadlines = student.upcomingDeadline.sort((a, b) => b.dueDate - a.dueDate);
    return res.json({ message: "All upcoming deadlines:", deadlines: sortedDeadlines });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// Delete an upcoming deadline
const deleteDeadline = async (req, res) => {
  try {
    const { studentId, deadlineId } = req.params;
    const student = await Students.findById(studentId);

    if (!student) {
      return res.json({ message: "Student doesn't exist" });
    }

    const deletedDeadline = student.upcomingDeadline.find(deadline => deadline._id.toString() === deadlineId);
    if (!deletedDeadline) {
      return res.json({ message: "Deadline not found" });
    }

    student.upcomingDeadline = student.upcomingDeadline.filter(deadline => deadline._id.toString() !== deadlineId);
    await student.save();
    return res.json({ message: "Deadline deleted successfully", deletedDeadline });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = {
  addGoal,
  getGoal,
  deleteGoal,
  addDeadline,
  getDeadline,
  deleteDeadline,
};
