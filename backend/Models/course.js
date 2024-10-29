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
    }
});

const Course=mongoose.model('course',courseSchema);
module.exports=Course;