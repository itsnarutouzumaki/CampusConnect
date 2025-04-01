const mongoose=require('mongoose');
const assignment=require('./assignmentSchema');
const student=require('./studentschema');

const studentAssignmentSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    fileUrl:{
        type:String,
        default:null,
        required:true
    }
},
{timestamps:true},
{collection:'studentAssignment'}
);

module.exports = mongoose.model('studentAssignment', studentAssignmentSchema);  