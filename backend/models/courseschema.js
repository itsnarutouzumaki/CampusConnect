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
    isActive:{
        type:['active','completed','upcoming'],
        default:'upcoming'
    },
    tutor: {
       type: String
        
    },
    studyMaterial: {
        type: [String],
    }
    // },quiz:{
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'teacher'
    // },
    // assignments:{
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref:'teacher'
    // }
     ,
    lecture:{
        type: [String]
    }    
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
