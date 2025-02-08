const mongoose=require('../connections/mongooseconnections.js');
const Schema=mongoose.Schema;
const questionschema=new Schema({
    name:{
        type:String,
        required:true
    },
    option:{
        type:[String],
        required:true
    }
    }    

);
const quizSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    questions:{
        type:[questionschema],
        required:true
    },
    courseid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses'
    }
},
{
    timestamps:true 
}
);
module.exports=quizSchema;