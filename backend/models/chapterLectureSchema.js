const mongoose=require('mongoose');
const course = require('./courseschema');

// Lecture Schema
const lectureSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    videoUrl: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: Number 
    },
    startDate:{
        type: Date,
        required: true
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    }
});

// Chapter Schema
const chapterSchema = new mongoose.Schema({
    title: {
         type: String, 
         required: true 
        },
    url:{
        type:String,
        required:true
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    }
});


const Lecture = mongoose.model('Lecture', lectureSchema);
const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = {
   Chapter,
    Lecture
};