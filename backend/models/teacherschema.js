const mongoose = require('mongoose');
const courses=require('./courseschema');
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    mobileNo:{
        type: Number,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    educationalBackground:{
        type:[]
    },
    courses:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    },
    joiningDate:{
        type: Date,
        default: Date.now
    },
    rating:{
        type: Number,
        min: 0,
        max:5
    },
    bio:{
        type: String
    },
    areaOfInterest:{
        type: [String]
    },
    profileImage:{
        type: String
    }
    
});

module.exports = mongoose.model('Teacher', teacherSchema);
