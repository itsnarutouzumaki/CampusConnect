const mongoose=require('mongoose');
const course = require('./courseschema');
const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileUrl:{
        type:String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);