const express=require('express');
const router=express.Router();
const quizController=require('../controller/quizcontroller/quizcontroller.js');
router.post('/takequiz',quizController.takequiz);
router.post('/addquiz',quizController.addquiz);
router.post('/submitquiz',quizController.submitquiz);

module.exports=router;