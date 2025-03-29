const mongoose=require('mongoose');
const course = require('./courseschema');
const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url:{
        type:String,
        required:true
    },
    dueDate: {
        type: Date,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    isSubmitted:{
        type: Boolean,
        default: false
    },
    dueDate:{
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    submittedAt:{
        type:Date
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);