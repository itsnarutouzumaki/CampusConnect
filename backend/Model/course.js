const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    // have to give reference of user in instructor
    // instructor:{

    // } 
    description:{
        type:String,
    },
    credit:{
        type:Number,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    enrollmentCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },img:{
        type:String,
        default:"https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg"
    }
});

const Course=mongoose.model('Course',courseSchema);
module.exports=Course;