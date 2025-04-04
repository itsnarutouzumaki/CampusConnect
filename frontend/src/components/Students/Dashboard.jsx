import React, {useEffect,useState } from "react";
import ChartComponent from "./Chart";
import EditStudent from "../Modal/EditStudent.modal";
import { FiEdit2 } from "react-icons/fi";
import AddGoal from "../Modal/AddGoal.modal";
import axios from "axios";
const HomeScreen =  ({
  userData = {
    name: "John Doe",
    profileimage:
      "https://i.pinimg.com/736x/80/04/d4/8004d4b5f2985ed905a021e9e2f1e79d.jpg",
    username: "johndoe",
    education: "B.Sc. Computer Science",
    Institute: "XYZ University",
    bio: "I am a student at XYZ University. I am passionate about learning new technologies and building cool projects.",
  },
  deadlines = [
    {
      id: 1,
      title: "Math Assignment 1",
      dueDate: "10-11-2024",
      dueTime: "10:00",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      dueDate: "12-11-2024",
      dueTime: "14:00",
    },
    { id: 3, title: "biology Quiz", dueDate: "15-11-2024", dueTime: "09:00" },
  ],
  studyGoals = [
    { id: 1, goal: "Read 3 chapters of Math", progress: "1/3" },
    { id: 2, goal: "Complete Physics Exercises", progress: "0/5" },
  ],
}) => {
  const [profile,setProfile] = useState(
    {
    fullname: "John Doe",
    profileimage:
      "https://i.pinimg.com/736x/80/04/d4/8004d4b5f2985ed905a021e9e2f1e79d.jpg",
    username: "johndoe",
    education: "B.Sc. Computer Science",
    //Institute: "XYZ University",
    bio: "I am a student at XYZ University. I am passionate about learning new technologies and building cool projects.",
      
    }
  );
  const [activeDeadlines, setActiveDeadlines] = useState([]);
  const [activeGoals, setActiveGoals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    const response=await axios.post('/api/students/combinedStudentData', 
  );
  setProfile(response.data.data.userDetails);
  setActiveDeadlines(response.data.data.upcomingTasks);  
  setActiveGoals(response.data.data.studyGoals);
 
    }
  fetchData();} , []);
  const handleGoalAchieved = (id) => {
    setActiveGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    const response=axios.post("/api/students/removegoals",
      {
        index: id,
      }
    );
    console.log(response);
  };
  const [AddGoalModal, setAddGoalModal] = useState(false)
  const closeModalAddGoal = () => setAddGoalModal(false);
 
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const closeModalEditStudent = () => setShowEditStudentModal(false);

  return (
    <div className="container mx-auto p-4 grid gap-6 grid-cols-1 md:grid-cols-2">
      {/* Profile Snapshot */}
      <section className="relative bg-white/20 backdrop-blur-[10%] p-6 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:shadow-white">
        {/* Pencil Icon */}
        <div
                  onClick={() => setShowEditStudentModal(true)}
                  className="absolute top-1 right-4 bg-purple-400 hover:bg-green-500 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <FiEdit2 className="w-5 h-5" />
                </div>

        <div className="relative">
          <img
            src={profile.profileimage}
            alt={`${profile.fullname}'s profile`}
            className="w-24 h-24 rounded-full"
          />
        </div>

        <div className="text-center mt-4">
          <h1 className="text-2xl text-white font-mono italic">
            {profile.fullname}
          </h1>

          <p className="text-gray-300 text-sm italic">{profile.education}</p>

          { <p className="text-gray-300 text-sm italic">{profile.email}</p> }

          {profile.bio && (
            <p className=" text-slate-300 italic mt-3 text-center">
              <span className="text-3xl text-red-500">❝</span>
              {profile.bio}
              <span className="text-3xl text-red-500">❞</span>
            </p>
          )}
        </div>
      </section>

      {/* Chart Placeholder */}
      <section className="bg-white/20 backdrop-blur-[10%] p-6 rounded-lg transition-transform transform hover:shadow-white shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          Your Progress Chart
        </h2>
        <div className="h-64 bg-white rounded-lg p-4">
          <ChartComponent /> {/* Chart component */}
        </div>
      </section>

      {/* Study Goals */}
      <section className="bg-white/20 backdrop-blur-[10%] p-6 rounded-lg hover:shadow-white shadow-md flex flex-col justify-between transition-transform transform ">
        <h2 className="text-xl font-semibold text-white mb-4">Study Goals</h2>
        <ul className="space-y-3 flex-grow">
          {activeGoals.map((goal) => (
            <li
              key={goal.id}
              className="flex justify-between items-center p-4 rounded-lg border-4 
      border-gray-500 hover:shadow-blue-400 shadow-lg"
            >
              <span className="text-white italic">{goal.goal}</span>
              <div className="flex items-center space-x-4 ">
                <button
                  onClick={() => handleGoalAchieved(goal.id)}
                  className="text-black bg-purple-400 px-3 py-1 rounded-lg hover:bg-purple-600 transition"
                >
                  Achieved
                </button>
              </div>
            </li>
          ))}
          {activeGoals.length === 0 && (
            <p className="text-white text-center">🎉All goals achieved!🎉</p>
          )}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setAddGoalModal(true)}
            className="text-white bg-teal-500 px-3 py-1 rounded-lg hover:bg-teal-800 transition"
          >
            Add Goal
          </button>
        </div>
      </section>
      {AddGoalModal && <AddGoal closeModal={closeModalAddGoal} />}
      {/* Upcoming Deadlines */}
      <section className="bg-white/20 backdrop-blur-[10%] p-6 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:shadow-white">
        <h2 className="text-xl font-semibold text-white mb-4">
          Upcoming Deadlines
        </h2>
        <ul className="space-y-3 flex-grow">
          {activeDeadlines.map((deadline) => (
            <li
              key={deadline.id}
              className="flex flex-col justify-between items-start p-4 rounded-lg border-4 
      border-gray-500 hover:shadow-blue-400 shadow-lg"
            >
              <div className="flex justify-between w-full">
                <span className="text-white italic font-semibold">{deadline.name}</span>
                <span className="text-gray-300">
                  {deadline.dueTime} {deadline.dueDate}
                </span>
              </div>
            </li>
          ))}
          {activeDeadlines.length === 0 && (
            <p className="text-gray-500 text-center">No upcoming deadlines.</p>
          )}
        </ul>
      </section>
      {showEditStudentModal && (
        <EditStudent closeModal={closeModalEditStudent} />
      )}
    </div>
  );
};

export default HomeScreen;
