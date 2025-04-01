const  {addChapter,getAllChapters,editChapter,deleteChapter,addLecture,getAllLectures,editLecture,deleteLecture}=require('../controller/ChapterAndLecture');
const express = require('express');
const router=express.Router();

router.post('/addChapter',addChapter);
router.post('/getAllChapters',getAllChapters);
router.put('/editChapter',editChapter);
router.delete('/deleteChapter',deleteChapter);
router.post('/addLecture',addLecture);
router.get('/getAllLectures',getAllLectures);
router.put('/editLecture/:id',editLecture);
router.delete('/deleteLecture',deleteLecture);
module.exports=router;