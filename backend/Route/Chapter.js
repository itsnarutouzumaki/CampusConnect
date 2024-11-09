const express=require('express');
const {addChapter,getChapter,updatechapter,removeChapter}=require('../Controllers/Chapter');
const router=express.Router();

//add a chapter
router.post('/:id',addChapter);

//get all chapter
router.get('/:id',getChapter);

//update chapter
router.put('/:id',updatechapter);

//delete chapter
router.delete('/:id',removeChapter);

module.exports=router;