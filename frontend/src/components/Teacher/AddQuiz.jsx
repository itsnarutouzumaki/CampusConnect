import React, { useState } from "react";
import axios from 'axios';
function AddQuiz() {
  const [quizName, setQuizName] = useState("");
  const [quizDate, setQuizDate] = useState("");
  const [quizTime, setQuizTime] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correctAnswer: "" }
  ]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answers: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleSubmit =async () => {
    console.log({ quizName, quizDate, quizTime, questions });
     
    const finaldata=[];
    for(let i=0;i<questions.length;i++)
    {
      finaldata.push(
        {"dateTime":quizDate,
          "name":questions[i].question,
          "option":questions[i].answers,
          "correctoption":questions[i].correctAnswer
        }
      );
    }
    console.log(finaldata);
    // const response=await axios.post("/api/quiz/addquiz",
    //   {
    //     name:quizName,
    //     courseid:"67eaa21786a568b53909b7fd",
    //     questions:finaldata
    //   }
    // );
    console.log(response);
    alert("Quiz submitted! Check the console for details.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add a Quiz</h2>
      
      {/* Quiz Name Input */}
      <input
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Date & Time Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={quizDate}
          onChange={(e) => setQuizDate(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={quizTime}
          onChange={(e) => setQuizTime(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Dynamic Questions */}
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Question {qIndex + 1}</h3>

          {/* Question Input */}
          <input
            type="text"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {q.answers.map((answer, aIndex) => (
            <div key={aIndex} className="flex items-center gap-2 mb-2">
              {/* Answer Input */}
              <input
                type="text"
                placeholder={`Answer ${aIndex + 1}`}
                value={answer}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Correct Answer Radio Button */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`correct-answer-${qIndex}`}
                  checked={q.correctAnswer === answer}
                  onChange={() => handleCorrectAnswerChange(qIndex, answer)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Correct</span>
              </label>
            </div>
          ))}
        </div>
      ))}

      {/* Add New Question Button */}
      <button
        onClick={handleAddQuestion}
        className="w-full mt-2 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
      >
        Add Another Question
      </button>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default AddQuiz;
