const  {addChapter,getAllChapters,editChapter,addLecture,getAllLectures,editLecture}=require('../controller/ChapterAndLecture');
const express = require('express');
const router=express.Router();

router.post('/addChapter',addChapter);
router.get('/getAllChapters',getAllChapters);
router.put('/editChapter/:id',editChapter);
router.post('/addLecture',addLecture);
router.get('/getAllLectures',getAllLectures);
router.put('/editLecture/:id',editLecture);

module.exports=router;