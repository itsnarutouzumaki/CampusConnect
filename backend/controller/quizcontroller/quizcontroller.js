const multer=require('multer');
const apiresponse=require('../../utils/apiresponse.js');
const quiz=require('../../models/quizschema.js');
const studentquiz=require('../../models/studentquizschema.js');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const addquiz=async(req,res)=>{
    const data=new quiz(req.body);
    const saveddata=await data.save();
    res.json(new apiresponse(200,'quiz added',{saveddata}));
};
const viewquizes=async(req,res)=>{
    const pipeline=[
        {
            $match: {
                startDate: { $lte: new Date() },  // startDate <= current date
                endDate: { $gte: new Date() }    // endDate >= current date
            }
        }
    ];
    const data=await quiz.aggregate(pipeline);
};
const takequiz=async(req,res)=>{
    const id=mongoose.Types.ObjectId(req.body._id);
    const data=await quiz.findOne({_id:id});
    res.json(new apiresponse(200,'quiz taken',{data}));
};
const submitquiz=async(req,res)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const d=jwt.decode(token);
    const data=new studentquiz(d._id,req.body.quiz_id,req.body.option);
    const saveddata=await data.save();
    res.json(new apiresponse(200,'quiz submitted',{saveddata}));
};
module.exports={
    addquiz,
    viewquizes,
    takequiz,
    submitquiz  
}