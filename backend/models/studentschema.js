const mongoose=require('../connections/mongooseconnections.js');
const Schema=mongoose.Schema;
const studentSchema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    
    },
    profileimage:{
        type:String,
    },
    username:{
        type:String,
    },
    progresspoint:{
        type:Array
    },
    education:{
        type:String
    },
    bio:{
        type:String
    }


});
const item=mongoose.model('students',studentSchema);
module.exports=item;