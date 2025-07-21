import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { viewresult } from "../../../../backend/controller/quizcontroller/quizcontroller";

const quizid = "67a741b20936cb668a827d69";
export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const quiz_id=useParams().quizId;
  
        
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        
        const api = await axios.post(
          "/api/quiz/takequiz",
          { _id: quiz_id}
        );
        console.log(api);
        const ques = api.data.message.data.questions;
        const formattedQuestions = ques.map((q, index) => ({
          id: index + 1,
          text: q.name,
          options: q.option,
        }));
        setQuestions(formattedQuestions);
        setSelectedOptions(Array(formattedQuestions.length).fill(null));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelections);
  };

  const handleSubmit = async () => {
    const options = {
      quizId: quizid,
      answers: selectedOptions,
      timeTaken: time,
    };
    const quiz_id = quizid;
    try {
      // Extract token from cookie
      const result = await axios.post(
        "/api/quiz/submitquiz",
        { options: selectedOptions, quiz_id: quiz_id },
        { withCredentials: true } // Pass quizData in the body
      );
      
      alert("Quiz Submitted Successfully!");

    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz.");
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-teal-700 text-white text-xl font-semibold px-6 py-2 rounded-lg text-center w-1/2">
          Quiz Name
        </div>
        <div className="bg-teal-700 text-white px-6 py-2 rounded-lg text-center w-1/4">
          Time: {formatTime(time)}
        </div>
      </div>

      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-teal-700 text-white rounded-lg flex flex-col items-center p-5">
          <h2 className="text-2xl font-bold mb-6">
            Question {questions[currentQuestionIndex].id}
          </h2>

          {/* Numbering Boxes */}
          <div className="grid grid-cols-3 gap-2 justify-items-center">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`w-12 h-12 flex items-center rounded-lg justify-center border border-white text-lg font-semibold cursor-pointer ${
                  index === currentQuestionIndex
                    ? "bg-green-500"
                    : "bg-teal-800 hover:bg-teal-600"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {q.id}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="bg-gray-700 rounded-lg px-6 py-4 mt-20 hover:bg-gray-900"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {/* Main Quiz Area */}
        <div className="w-3/4 flex flex-col items-center p-6 mt-9">
          {/* Question */}
          <div className="bg-slate-200 w-3/5 text-lg font-semibold p-6 rounded-lg shadow-md">
            {questions[currentQuestionIndex].text}
          </div>

          {/* Options */}
          <div className="w-3/5 mt-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-black text-lg py-4 mt-4 rounded-lg font-medium transition-colors ${
                  selectedOptions[currentQuestionIndex] === option
                    ? "bg-green-500"
                    : "bg-slate-400 hover:bg-stone-500"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation Bar */}
          <div className="w-3/5 flex justify-between border-3 border-red-800 mt-6">
            <button
              className="border-2 border-white text-white rounded-lg px-14 py-4 hover:bg-white hover:text-black transition duration-300"
              onClick={handlePrev}
            >
              Prev
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                className="border-2 border-white text-white rounded-lg px-14 py-4 hover:bg-white hover:text-black transition duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="border-2 border-white text-white rounded-lg px-14 py-4 hover:bg-white hover:text-black transition duration-300"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
