const mongoose=require('../connections/mongooseconnections.js');
const Schema=mongoose.Schema;
const studentquizschema=new Schema({
    student_id:{Type:String},
    course_id:{Type:mongoose.Schema.Types.ObjectId},
},
{collection:'studentenrolled',});
module.exports=mongoose.model('studentenrolled',studentquizschema);