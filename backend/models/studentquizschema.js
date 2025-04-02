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
    marks:{
        type:String
    },
    total_marks:{
        type:String,
        default:0
    }
},
{collection:'studentquiz',
    timestamps:true
}
);
module.exports=mongoose.model("studentquiz",studentquizschema);