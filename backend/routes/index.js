const express = require('express');
const student = require('./studentroutes.js');
const teacher = require('./teacherroute.js');

const router = express.Router();

router.use('/students', student);
router.use('/teachers', teacher);

module.exports = router;