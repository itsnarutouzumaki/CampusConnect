const mongoose=require('mongoose');

const chapterSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    url:{
        type:String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Chapters=mongoose.model('Chapter',chapterSchema);
module.exports=Chapters;