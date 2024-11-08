import React from 'react';
import ChartComponent from './Students/Chart';

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
  return (
    <div className="container mx-auto p-4 grid gap-6 grid-cols-1 md:grid-cols-2">
      
      {/* Profile Snapshot */}
      <section className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="relative">
          <img
            src={userData.profilePhoto}
            alt={`${userData.name}'s profile`}
            className="w-24 h-24 rounded-full"
          />
        </div>
        
        <div className="text-center mt-4">
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
          <p className="text-gray-600">Aura Points: {userData.auraPoints}</p>
          <p className="text-gray-600">Level: {userData.level}</p>
          
          <div className="mt-2">
            <h2 className="font-semibold">Achievements:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {userData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Chart Placeholder */}
      <section className="bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Progress Chart</h2>
        <div className="h-64 bg-blue-50 rounded-lg p-4">
          <ChartComponent /> {/* Chart component */}
        </div>
      </section>
      
      {/* Study Goals */}
      <section className="bg-yellow-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Study Goals</h2>
        <ul className="space-y-3">
          {studyGoals.map((goal) => (
            <li key={goal.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <span>{goal.goal}</span>
              <span className="text-gray-500">{goal.progress}</span>
            </li>
          ))}
          {studyGoals.length === 0 && (
            <p className="text-gray-500 text-center">All goals achieved!</p>
          )}
        </ul>
      </section>
      
      {/* Upcoming Deadlines */}
      <section className="bg-green-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <ul className="space-y-3">
          {deadlines.map((deadline) => (
            <li key={deadline.id} className="flex justify-between items-start bg-white p-4 rounded-lg shadow-sm">
              <div>
                <span className="font-semibold">{deadline.title}</span>
                <span className="text-gray-500 block">{deadline.dueTime}  {deadline.dueDate}</span>
              </div>
            </li>
          ))}
          {deadlines.length === 0 && (
            <p className="text-gray-500 text-center">No upcoming deadlines.</p>
          )}
        </ul>
      </section>
      
    </div>
  );
};

export default HomeScreen;
