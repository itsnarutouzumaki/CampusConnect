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
    },
    correctoption:{
        type:String,
        required:true
    }}    

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
    },
    quizDate:
    {
        type:Date
    }
},

{
    collection:'quiz',
    timestamps:true 
}
);
const item=mongoose.model('quiz',quizSchema);
module.exports=item;