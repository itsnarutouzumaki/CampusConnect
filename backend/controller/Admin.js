const { default: mongoose } = require('mongoose');
const Admins=require('../models/admin.js');
const response=require('../utils/apiresponse.js');

const checkUserExists = async (req, res, next) => {
    const email = req.body.email;
    try {
      const student = await item2.findOne({ email: email });
      if (student) {
        return res.status(400).send("User already exists");
      }
      next();
    } catch (err) {
      res.status(500).send("Server error");
    }
  };


//login 
const login= async(req,res) =>{
    const {email,password} =req.body;

   try{
    const admin = await Admins.findOne({email});

    if(!admin){
        return res.json({message: "email is not exist"});
    }

    if(password === admin.password){
        // Generate JWT token
          const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
        
          // Store token in HTTP-only cookie
          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
          });
        return res.json(new response(200,admin,'admin login successfully'));
    }else {
        return res.json({sucess:'false',message:"incorrect password"});
    }
   }catch(err){
    return res.json({success:'false',message:err.messaage})
   }
};
const updatedetails=async (req,res)=>{
  const id=new mongoose.Types.ObjectId(req.body.student_id);
  
 const duplicatedata=
{
  'name':req.body.name,
}
 
if(req.file && req.file.path)
{
duplicatedata['image']=req.file.path;
}
console.log(duplicatedata);
const updatedata=await Admins.findOneAndUpdate({_id:id},{
  $set:duplicatedata
},
{new:true}  
);
return res.json(new response(200,updatedata,'details updated successfully'));
}
module.exports={login,updatedetails};