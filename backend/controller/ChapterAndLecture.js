const { Chapter, Lecture } = require('../models/chapterLectureSchema');
const Courses=require('../models/courseschema');
const response=require('../utils/apiresponse');
const { default: mongoose } = require("mongoose");
// Add a chapter
const addChapter = async (req, res) => {
    const {title,url,course} = req.body;
    const isPresent= await Courses.findById(course);
    if(!isPresent){
        return res.json({status:'failure',message:'course not found'});
    }
    try{
        const chapter = await Chapter.create({title,url,course});
        return res.json(new response(200,chapter,'chapter created succesfully'));
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

// get all chapters
const getAllChapters = async (req, res) => {
    try{
    const id=new mongoose.Types.ObjectId(req.body.course_id);
        const chapters = await Chapter.find({course:id});
        return res.json(new response(200,chapters,'All chapters fetched successfully'));
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

//edit chapter
const editChapter = async (req, res) => {
    const name=req.body.name;
    const url=req.body.url;
    const actualdata={
        'title':name,
        'url':url
    }
    try
    {
    const chapterid=new mongoose.Types.ObjectId(req.body.chapter_id);
    const chapter=await Chapter.findOneAndUpdate({_id:chapterid},{$set:actualdata},
    {new:true}
    );
    return res.json(new response(200,chapter,'chapter updated successfully'));
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

// delete chapter
const deleteChapter = async (req, res) => {
    const chapterId=new mongoose.Types.ObjectId(req.body.id);
    try{
        const chapter = await Chapter.findByIdAndDelete({_id:chapterId});
        if(!chapter){
            return res.json(new response(400,{},'chapter not found'));
        }
        return res.json(new response(200,chapter,'chapter deleted successfully'));
    }
    catch(err){
        return res.json(new response(400,err.message,'chapter deletion failed'));
    }
}

// add a lecture
const addLecture = async (req, res) => {
    const {title,videoUrl,duration,startDate,course} = req.body;
    const course_id=new mongoose.Types.ObjectId(course);
    console.log(course_id);
    const isPresent= await Courses.findOne({_id:course_id});
    if(!isPresent){
        return res.json({status:'failure',message:'course not found'});
    }
    try{
        const lecture = await Lecture.create({title,videoUrl,duration,startDate,course});
        return res.json(new response(200,lecture,'lecture created successfully'));
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

// get all lectures
const getAllLectures = async (req, res) => {
    try{console.log(req.body.courseId);
        const courseId=new mongoose.Types.ObjectId(req.body.courseId);
        const lectures = await Lecture.find({course:courseId});
        return res.json(new response(200,lectures,'all lectures fetched successfully'));
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

//edit Lecture
const editLecture = async (req, res) => {
    const {title,videoUrl,duration,startDate,course} = req.body;
    const isPresent= await Courses.findById(course);
    if(!isPresent){
        return res.json({status:'failure',message:'course not found'});
    }
    try{
        const lecture = await Lecture.findByIdAndUpdate(req.params.id,{title,videoUrl,duration,startDate,course});
        return res.json(new response(200,lecture,'lecture updated successfully'));
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

// delete lecture
const deleteLecture = async (req, res) => {
    const lectureId=new mongoose.Types.ObjectId(req.body.id); 
    try{
        const lecture = await Lecture.findByIdAndDelete({_id:lectureId});
        if(!lecture){
            return res.json(new response(400,{},'lecture not found'));
        }
        return res.json(new response(200,lecture,'lecture deleted successfully'));
    }
    catch(err){
        return res.json(new response(400,err.message,'lecture deletion failed'));
    }
}

//start meet or lecture
const startMeet = async(req,res) =>{
    const lectureId=new mongoose.Types.ObjectId(req.body.lectureId);
    const videoUrl=req.body.videoUrl;

    try{
        const lecture = await Lecture.findByIdAndUpdate(lectureId,{
            videoUrl:videoUrl
        },{new:true});
    
        if(!lecture){
            console.log('lecture not found');
            return res.json(new response(400,{},'lecture is not present'));
        }
        console.log('lecture has been updated');
        return res.json(new response(200,lecture,'lecture has been started'));
    }catch(err){
        console.log(err.message);
        return res.json(new response(400,err,err.message));
    }
}

module.exports = {
    addChapter,
    getAllChapters,
    editChapter,
    deleteChapter,
    addLecture,
    getAllLectures,
    editLecture,
    deleteLecture,
    startMeet
}