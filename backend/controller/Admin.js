const Admins=require('../models/admin.js');

//login 
const login= async(req,res) =>{
    const {email,password} =req.body;

   try{
    const admin = await Admins.findById({email});

    if(!admin){
        return res.json({message: "email is not exist"});
    }

    if(password=== admin.password){
        return res.json({success:'true', message: " admin login successfully ",admin});
    }else {
        return res.json({sucess:'false',message:"incorrect password"});
    }
   }catch(err){
    return res.json({success:'false',message:err.messaage})
   }
};

module.exports={login};