import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const QuizBar = ({ quiz }) => {
  const { quizId,quizName, hours, minutes, time, date } = quiz;
  return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg justify-between items-center"
    >
      <p className="text-xl flex flex-col italic text-white font-sans">
        <span className="text-white no-underline">{quizName}</span>
        <span className="text-gray-400 text-sm italic">{`Duration: ${hours}hrs ${minutes}min at ${time} ${date}`}</span>
      </p>
      <div className="flex p-1">
        <div className="cursor-pointer w-fit h-fit text-white mr-2 bg-white/30 p-1 rounded-md hover:text-black hover:bg-orange-300">
          Take Quiz
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  const quizs = [
    {
      quizId: 1,
      quizName: "Introduction to Algebra",
      hours:2,
      minutes: 30,
      time: "10:30 AM",
      date: "2023-12-01",
    },
    {
      quizId: 2,
      quizName: "Advanced Geometry",
      hours: 2,
      minutes: 15,
      time: "02:00 PM",
      date: "2023-12-02",
    },
  ];

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {quizs.map((quiz) => (
        <QuizBar key={quiz.quizId} quiz={quiz} />
      ))}
    </div>
  );
};

export default Quiz;
