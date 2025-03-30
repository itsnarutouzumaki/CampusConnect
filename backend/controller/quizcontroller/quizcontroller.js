const multer = require("multer");
const apiresponse = require("../../utils/apiresponse.js");
const quiz = require("../../models/quizschema.js");
const studentquiz = require("../../models/studentquizschema.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const addquiz = async (req, res) => {
  const data = new quiz(req.body);
  const saveddata = await data.save();
  res.json(new apiresponse(200, "quiz added", { saveddata }));
};
const viewquizes = async (req, res) => {
  const pipeline = [
    {
      $match: {
        startDate: { $lte: new Date() }, // startDate <= current date
        endDate: { $gte: new Date() }, // endDate >= current date
      },
    },
  ];
  const data = await quiz.aggregate(pipeline);
};
const takequiz = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body._id);
  const data = await quiz.findOne({ _id: id });
  res.json(new apiresponse(200, "quiz taken", { data }));
};
const submitquiz = async (req, res) => {
  const data = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.body.quiz_id),
      },
    },
    {
      $project: {
        correctOptions: "$questions.correctoption",
      },
    },
  ];
  const fetchdata = await quiz.aggregate(data);
  console.log(req.body);
  const gienarray = req.body.options;
  const resultArray = fetchdata[0].correctOptions;

  var count = 0;
  for (let index = 0; index < resultArray.length; index++) {
   
    if (resultArray[index].toString() === gienarray[index].toString()) {
      count++;
    }
  }
  const storedata = new studentquiz({
    quizid: req.body.quiz_id,
    studentid: req.body.student_id,
    marks: count,
    total_marks: resultArray.length,
  });
  const savedata = await storedata.save();
  res.json(new apiresponse(200, "quiz submitted", savedata));

  // const data=new studentquiz(d._id,req.body.quiz_id,);
  // const saveddata=await data.save();
  // res.json(new apiresponse(200,'quiz submitted',{saveddata}));
};
const viewresult=async (req, res) => {
    const studentid= new mongoose.Types.ObjectId(req.body.student_id);
    const quizid= new mongoose.Types.ObjectId(req.body.quiz_id);
const data=await studentquiz.findOne({studentid:studentid,quizid:quizid});
return res.json(new apiresponse(200,'quiz result fetched',data));
}

module.exports = {
  addquiz,
  viewquizes,
  takequiz,
  submitquiz,
  viewresult
};
