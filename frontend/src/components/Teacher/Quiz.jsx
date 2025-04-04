import React, { useState,useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';
const QuizBar = ({ quiz }) => {
// const { quizId,quizName, hours, minutes, time, date } = quiz;
const quizName = quiz.name;

const [date, time] = quiz.quizDate?.split("T") || [];
const [hours, minutes] = time?.split(":") || [];

return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg justify-between items-center"
    >
      <p className="text-xl flex flex-col italic text-white font-sans">
        <span className="text-white no-underline">{quizName}</span>
        <span className="text-gray-400 text-sm italic">{`Duration: ${hours}hrs ${minutes}min at ${date}`}</span>
      </p>
  
    </div>
  );
};

const Quiz = () => {
  
  
  // const quizs = [
  //   {
  //     quizId: 1,
  //     quizName: "Introduction to Algebra",
  //     hours:2,
  //     minutes: 30,
  //     time: "10:30 AM",
  //     date: "2023-12-01",
  //   },
  //   {
  //     quizId: 2,
  //     quizName: "Advanced Geometry",
  //     hours: 2,
  //     minutes: 15,
  //     time: "02:00 PM",
  //     date: "2023-12-02",
  //   },
  // ];
const [quizs,setquizes]=useState([]);
useEffect(() => { 
    const fetchQuiz = async () => {
      try {
        const response = await axios.post("/api/quiz/viewAllQuiz", {
          studentId: "67eaa21786a568b53909b7fd",
          courseId: "67eaa21786a568b53909b7fd",
        });
        
        setquizes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuiz();
  }, []);

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {quizs.map((quiz) => (
        <QuizBar key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};
export default Quiz;
