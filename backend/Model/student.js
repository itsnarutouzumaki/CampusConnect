const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, minlength: 2, maxlength: 50 },
        email: { type: String, required: true, unique: true, maxlength: 50 },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: "student", enum: ["student"] },
        academicGoals: { type: String, maxlength: 300 },
        courseSchedule: [
            {
                courseName: { type: String },
                day: { type: String },
                time: { type: String }
            }
        ],
        progress: { type: Array, default: [] },
        auraPoint: { type: Number, default: 0 },
        auraCoin: { type: Number, default: 0 },
        collegeName: { type: String },
        img_url: { type: String, default: null }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
