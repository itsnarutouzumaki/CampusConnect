const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizcontroller/quizcontroller.js");
const studentmw = require("../middleware/jwttoken.js");

router.post("/takequiz", quizController.takequiz);
router.post("/addquiz", quizController.addquiz);
router.post("/submitquiz",studentmw.authenticateJWT, quizController.submitquiz);
router.post('/viewresult',quizController.viewresult);
router.post('/viewAllQuiz',studentmw.authenticateJWT,quizController.viewAllQuiz);

module.exports = router;
