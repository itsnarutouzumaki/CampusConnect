const mongoose = require('mongoose');

// Teacher Schema
const teacherSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
           
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "teacher", // Default role is teacher
            enum: ["teacher"],  // Only teacher for this model
        },
        designation: {
            type: String,
            maxlength: 100,
        },
        qualification: {
            type: String,
            maxlength: 100,
        },
        areaOfInterest: {
            type: [String], // Array to store multiple interests
            maxlength: 100,
        },
        bio: {
            type: String,
            maxlength: 500,
        },
        courses: [
            {
                courseName: { type: String },
                courseCode: { type: String },
                description: { type: String},
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);