const mongoose = require("../connections/mongooseconnections.js");
const Schema = mongoose.Schema;

const studentQuizSchema = new Schema(
  {
    student_id: { type: String, required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { collection: "student_enrolled" }
);

module.exports = mongoose.model("studentenrolled", studentQuizSchema);
