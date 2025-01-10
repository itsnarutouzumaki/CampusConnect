import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Course name is required"],
    },
    courseCode: {
      type: String,
      required: [true, "Course code is required"],
      unique: [true, "Course code must be unique"],
      index: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://i.pinimg.com/736x/0e/bf/b5/0ebfb526e3632aa0a6cf71b432acc1d7.jpg",
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be greater than start date",
      },
    },
    maxStudent: {
      type: Number,
      required: [true, "MaxStudent is required"],
      default: 100,
      min: [1, "Minimum value is 1"],
      max: [500, "Maximum value is 500"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: [true, "Instructor is required"],
    },
    lessons: [
      {
        title: {
          type: String,
          required: [true, "Lesson title is required"],
        },
        link: {
          type: String,
          required: [true, "Lesson link is required"],
        },
      },
    ],
    lectures: [
      {
        title: {
          type: String,
          required: [true, "Lecture title is required"],
        },
        link: {
          type: String,
          required: [true, "Lecture link is required"],
        },
      },
    ],
    enrolledStudents: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "student",
          required: [true, "Student ID is required"],
        },
        transactionId: {
          type: String,
          required: [true, "Transaction ID is required"],
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    assignments: [
      {
        title: {
          type: String,
          required: [true, "Assignment title is required"],
        },
        link: {
          type: String,
          required: [true, "Assignment link is required"],
        },
        lastDate: {
          type: Date,
          required: [true, "Last date is required"],
        },
        submittedBy: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "student",
              required: [true, "Student ID is required"],
            },
            submittedAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
    quizzes: [
      {
        title: {
          type: String,
          required: [true, "Quiz title is required"],
        },
        link: {
          type: String,
          required: [true, "Quiz link is required"],
        },
        attendedBy: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "student",
              required: [true, "Student ID is required"],
            },
            obtainedMarks: {
              type: Number,
              required: [true, "Obtained marks are required"],
            },
            maxMarks: {
              type: Number,
              required: [true, "Maximum marks are required"],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);