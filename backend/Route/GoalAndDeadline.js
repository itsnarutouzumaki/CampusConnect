const express = require('express');
const {addGoal,getGoal,deleteGoal,addDeadline,getDeadline,deleteDeadline}=require('../Controller/GoalAndDeadline');
const {verifyToken} = require('../Middleware/Authentication');

const router = express.Router();

// study goal routes
router.post('/student/:id/addGoal',addGoal);
router.get('/student/:id/getGoal',getGoal);
router.delete('/student/:studentId/goal/:goalId/deleteGoal',deleteGoal);

// upcoming deadline routes
router.post('/student/:id/addDeadline',addDeadline);
router.get('/student/:id/getDeadline',getDeadline);
router.delete('/student/:studentId/deadline/:deadlineId/deleteDeadline',deleteDeadline);

module.exports=router;