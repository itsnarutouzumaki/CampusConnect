const mongoose=require('../connections/mongooseconnections.js');
const Schema=mongoose.Schema;
const studentquizschema=new Schema({
    quizid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quiz'
    },
    studentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students'
    },
    option:{
        type:[String]
    }
});
module.exports=studentquizschema;