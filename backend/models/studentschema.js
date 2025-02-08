const mongoose=require('../connections/mongooseconnections.js');
const Schema=mongoose.Schema;
const studentSchema=new Schema({
    fullname:{
        type:String,
        // required:true
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
    education:{
        type:String
    },
    bio:{
        type:String
    },
    studyGoals:{
        type:[String]
    }
},
{timestamps:true}
);
const item=mongoose.model('students',studentSchema);
module.exports=item;