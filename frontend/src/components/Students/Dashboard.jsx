import React, { useState } from 'react';
import ChartComponent from './Chart';

const HomeScreen = ({
  userData = {
    name: "John Doe",
    profilePhoto: "https://via.placeholder.com/150",
    auraPoints: 150,
    level: 5,
    achievements: ["First Assignment", "Top Scorer"],
  },
  deadlines = [
    { id: 1, title: "Math Assignment 1", dueDate: "10-11-2024", dueTime: "10:00" },
    { id: 2, title: "Physics Lab Report", dueDate: "12-11-2024", dueTime: "14:00" },
    { id: 3, title: "Biology Quiz", dueDate: "15-11-2024", dueTime: "09:00" },
  ],
  studyGoals = [
    { id: 1, goal: "Read 3 chapters of Math", progress: "1/3" },
    { id: 2, goal: "Complete Physics Exercises", progress: "0/5" },
  ],
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userData);
  const [activeDeadlines, setActiveDeadlines] = useState(deadlines);
  const [activeGoals, setActiveGoals] = useState(studyGoals);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePhoto: imageUrl,
      }));
    }
  };

  const handleDeadlineDone = (id) => {
    setActiveDeadlines((prevDeadlines) =>
      prevDeadlines.filter((deadline) => deadline.id !== id)
    );
  };

  const handleGoalAchieved = (id) => {
    setActiveGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== id)
    );
  };

  const addDeadline = () => {
    const newTitle = prompt("Enter the title of the deadline:");
    const newDueDate = prompt("Enter the due date (DD-MM-YYYY):");
    const newDueTime = prompt("Enter the due time (HH:MM) 24Hrs Format:");

    if (newTitle && newDueDate && newDueTime) {
      const formattedDate = newDueDate.split('-').reverse().join('-');
      const newDeadline = {
        id: activeDeadlines.length + 1,
        title: newTitle,
        dueDate: formattedDate,
        dueTime: newDueTime,
      };
      setActiveDeadlines((prevDeadlines) => [...prevDeadlines, newDeadline]);
    }
  };

  const addGoal = () => {
    const newGoal = {
      id: activeGoals.length + 1,
      goal: prompt("Enter the new goal:"),
      progress: "0/5",
    };
    if (newGoal.goal) {
      setActiveGoals((prevGoals) => [...prevGoals, newGoal]);
    }
  };

  return (
    <div className="container mx-auto p-4 grid gap-6 grid-cols-1 md:grid-cols-2">
      
      {/* Profile Snapshot */}
      <section className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
        <div className="relative">
          <img
            src={profile.profilePhoto}
            alt={`${profile.name}'s profile`}
            className="w-24 h-24 rounded-full"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
              <span role="img" aria-label="Edit" className="text-gray-700 text-sm">✏️</span>
            </label>
          )}
        </div>
        
        <div className="text-center mt-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="text-2xl font-semibold border-b border-gray-300 rounded-lg focus:outline-none text-center"
            />
          ) : (
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
          )}
          <p className="text-gray-600">Aura Points: {profile.auraPoints}</p>
          <p className="text-gray-600">Level: {profile.level}</p>
          
          <div className="mt-2">
            <h2 className="font-semibold">Achievements:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {profile.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={toggleEditMode}
            className="mt-4 text-white bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </section>
      
      {/* Chart Placeholder */}
      <section className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Your Progress Chart</h2>
        <div className="h-64 bg-blue-50 rounded-lg p-4">
          <ChartComponent /> {/* Chart component */}
        </div>
      </section>
      
      {/* Study Goals */}
      <section className="bg-yellow-100 p-6 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Study Goals</h2>
        <ul className="space-y-3 flex-grow">
          {activeGoals.map((goal) => (
            <li key={goal.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <span>{goal.goal}</span>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">{goal.progress}</span>
                <button
                  onClick={() => handleGoalAchieved(goal.id)}
                  className="text-white bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  Achieve
                </button>
              </div>
            </li>
          ))}
          {activeGoals.length === 0 && (
            <p className="text-gray-500 text-center">All goals achieved!</p>
          )}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={addGoal}
            className="text-white bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Add Goal
          </button>
        </div>
      </section>
      
      {/* Upcoming Deadlines */}
      <section className="bg-green-100 p-6 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <ul className="space-y-3 flex-grow">
          {activeDeadlines.map((deadline) => (
            <li
              key={deadline.id}
              className="flex flex-col justify-between items-start bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between w-full">
                <div>
                  <span className="font-semibold">{deadline.title}</span>
                  <span className="text-gray-500 block">
                    {deadline.dueTime}  {deadline.dueDate}
                  </span>
                </div>
                <button
                  onClick={() => handleDeadlineDone(deadline.id)}
                  className="text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition mt-2 ml-4"
                >
                  Done
                </button>
              </div>
            </li>
          ))}
          {activeDeadlines.length === 0 && (
            <p className="text-gray-500 text-center">No upcoming deadlines.</p>
          )}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={addDeadline}
            className="text-white bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Add Deadline
          </button>
        </div>
      </section>
      
    </div>
  );
};

export default HomeScreen;
