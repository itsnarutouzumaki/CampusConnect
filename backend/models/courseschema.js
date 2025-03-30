const mongoose = require('mongoose');
const teacher = require('./teacherschema');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    courseId:{
        type: String,
       required: true,
       unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coordinator: {
       type: String
    },
    startDate: {
        type: Date
    },
    expiryDate:{
        type: Date
    },
    pdfLink:{
        type:String
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
