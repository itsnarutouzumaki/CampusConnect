const { Chapter, Lecture } = require('../models/chapterLectureSchema');
const Courses=require('../models/courseschema');

// Add a chapter
const addChapter = async (req, res) => {
    const {title,url,course} = req.body;
    const isPresent= await Courses.findById(course);
    if(!isPresent){
        return res.json({status:'failure',message:'course not found'});
    }
    try{
        const chapter = await Chapter.create({title,url,course});
        return res.json({status:'success',message:'chapter created successfully',chapter});
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

// get all chapters
const getAllChapters = async (req, res) => {
    try{
        const chapters = await Chapter.find();
        return res.json({status:'success',message:'All chapters fetched successfully',chapters});
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

//edit chapter
const editChapter = async (req, res) => {
    const {title,url,course} = req.body;
    const isPresent= await Courses.findById(course);
    if(!isPresent){
        return res.json({status:'failure',message:'course not found'});
    }
    try{
        const chapter = await Chapter.findByIdAndUpdate(req.params.id,{title,url,course});
        return res.json({status:'success',message:'chapter updated successfully',chapter});
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

// add a lecture
const addLecture = async (req, res) => {
    const {title,videoUrl,duration,startDate,course} = req.body;
    const isPresent= await Courses.findById(course);
    if(!isPresent){
        return res.json({status:'failure',message:'course not found'});
    }
    try{
        const lecture = await Lecture.create({title,videoUrl,duration,startDate,course});
        return res.json({status:'success',message:'Lecture created successfully',lecture});
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

const getAllLectures = async (req, res) => {
    try{
        const lectures = await Lecture.find();
        return res.json({status:'success',message:'All lectures fetched successfully',lectures});
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
        return res.json({status:'success',message:'Lecture updated successfully',lecture});
    }
    catch(err){
        return res.json({status:'failure',message:err.message});
    }
}

module.exports = {
    addChapter,
    getAllChapters,
    editChapter,
    addLecture,
    getAllLectures,
    editLecture
}