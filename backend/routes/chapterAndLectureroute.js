const  {addChapter,getAllChapters,editChapter,deleteChapter,addLecture,getAllLectures,editLecture,deleteLecture,startMeet}=require('../controller/ChapterAndLecture');
const express = require('express');
const router=express.Router();

router.post('/addChapter',addChapter);
router.post('/getAllChapters',getAllChapters);
router.put('/editChapter',editChapter);
router.delete('/deleteChapter',deleteChapter);
router.post('/addLecture',addLecture);
router.post('/getAllLectures',getAllLectures);
router.put('/editLecture/:id',editLecture);
router.delete('/deleteLecture',deleteLecture);
router.put('/startMeet',startMeet);
module.exports=router;