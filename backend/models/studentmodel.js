const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            max: 50,
        },
        academicGoals: { 
            type: String 
        },
        courseSchedule: [
            {
                courseName: String,
                day: String,
                time: String
            }
        ],
        progress: { 
            type: Number, 
            default: 0 
        }
    }
);

module.exports = mongoose.model('Student', studentSchema);
