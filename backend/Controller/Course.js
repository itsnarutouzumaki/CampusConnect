const Courses = require("../Model/course");

// adding a course
const addCourse = async (req, res) => {
  let {
    name,
    code,
    description,
    credit,
    duration,
    startDate,
    endDate,
    enrollmentCount,
    createdAt,
  } = req.body;

  try {
    let course = await Courses.create({
      name,
      code,
      description,
      credit,
      duration,
      startDate,
      endDate,
      enrollmentCount,
      createdAt,
    });

    res.json({ message: "course added successfully", course });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// get course details
const getCourse = async (req, res) => {
  const course = await Courses.find().sort({ createdAt: -1 });
  res.json({ message: "all courses", course });
};

// update a course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Courses.findByIdAndUpdate(courseId, req.body, {
      new: true
    });
    if (!course) {
      return res.json({ message: "course doesn't exist" });
    }

    return res.json({ message: "course has been updated", course });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

// delete a chapter
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Courses.findByIdAndDelete(courseId);

    if (!course) {
      return res.json({ message: "course doesn't exist" });
    }

    return res.json({ message: "course deleted successfully", course });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = { addCourse, getCourse, updateCourse, deleteCourse };
