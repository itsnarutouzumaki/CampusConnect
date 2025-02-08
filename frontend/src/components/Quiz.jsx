import { useState, useEffect } from "react";

export default function Quiz() {
  
  const questions = [
    { id: 1, text: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"] },
    { id: 2, text: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"] },
    { id: 3, text: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"] },
    { id: 4, text: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
    { id: 5, text: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"] },
    { id: 6, text: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"] },
    { id: 7, text: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Iron", "Helium"] },
    { id: 8, text: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"] },
    { id: 9, text: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"] },
    { id: 10, text: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"] },
  ];

  const [time, setTime] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
    const quizData = {
      answers: selectedOptions,
      timeTaken: time,
    };

    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      const result = await response.json();
      alert("Quiz Submitted Successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz.");
    }
  };

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
          <h2 className="text-2xl font-bold mb-6">Question {questions[currentQuestionIndex].id}</h2>

          {/* Numbering Boxes */}
          <div className="grid grid-cols-3 gap-2 justify-items-center">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`w-12 h-12 flex items-center rounded-lg justify-center border border-white text-lg font-semibold cursor-pointer ${
                  index === currentQuestionIndex ? "bg-green-500" : "bg-teal-800 hover:bg-teal-600"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {q.id}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button className="bg-gray-700 rounded-lg px-6 py-4 mt-20 hover:bg-gray-900" onClick={handleSubmit}>
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
                  selectedOptions[currentQuestionIndex] === option ? "bg-green-500" : "bg-slate-400 hover:bg-stone-500"
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
