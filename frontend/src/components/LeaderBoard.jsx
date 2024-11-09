import React, { useState } from "react";
import { Link } from "react-router-dom";

const LeaderboardBar = ({ rank, name, points }) => {
  return (
    <Link className="w-[95%] hover:shadow-2xl hover:shadow-black/80 h-fit px-4 py-2 m-2 flex justify-between items-center border-2 border-red-500 bg-red-200 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-green-300 text-gray-800 font-bold">
          {rank}
        </div>
        <div className="text-gray-800 font-bold text-sm sm:text-base">
          {name}
        </div>
      </div>
      <div className="text-gray-800 font-bold text-sm sm:text-lg">
        {points}
      </div>
    </Link>
  );
};

const SmallRewardCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden m-2 w-full">
      <div className="bg-red-600 p-4 text-center text-white">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOCCFNfPrzNtXlmbgctYI3KcSGPW734ZHUg&s"
          alt="LeetCode Kit"
          className="w-full aspect-square mx-auto"
        />
      </div>
      <div className="p-3 flex justify-between">
        <div>
          <div className="text-base font-semibold">LeetCode Kit</div>
          <div className="text-gray-500 text-xs font-normal">Includes t-shirt</div>
        </div>
        <button className="flex items-center px-2 py-1 bg-[#EC971F] rounded-md">
          <span className="text-lg font-bold mr-1 text-white">7,800</span>
          <img
            src="https://i.ibb.co/2SwpD66/a.png"
            alt="coin icon"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [auroPoint, setAuroPoint] = useState(0);
  const student = [
    { name: "Hannah", points: 92 },
    { name: "Zane", points: 90 },
    { name: "Kathy", points: 88 },
    { name: "Uma", points: 85 },
    { name: "Bella", points: 84 },
    { name: "Mona", points: 83 },
    { name: "Eve", points: 81 },
    { name: "Paul", points: 77 },
    { name: "Yara", points: 73 },
    { name: "Bob", points: 72 },
    { name: "Sam", points: 70 },
    { name: "Wendy", points: 69 },
    { name: "Rachel", points: 68 },
    { name: "Diane", points: 65 },
    { name: "Nick", points: 64 },
    { name: "Victor", points: 61 },
    { name: "Adam", points: 60 },
    { name: "Quinn", points: 59 },
    { name: "Grace", points: 58 },
    { name: "Carl", points: 57 },
    { name: "Tina", points: 56 },
    { name: "Alice", points: 53 },
    { name: "Xander", points: 52 },
    { name: "Leo", points: 51 },
    { name: "Olivia", points: 49 },
    { name: "Ivan", points: 47 },
    { name: "Charlie", points: 45 },
    { name: "Frank", points: 39 },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen gap-4 p-4">
      <div className="bg-blue-100 flex-1 p-4 w-full md:w-[48%] border text-center text-black font-black rounded-xl">
        LEADERBOARD
        <div className="space-y-4 overflow-y-auto max-h-[40vh] md:max-h-[80vh] mt-4 hide-scrollbar">
          {student.map((user, index) => (
            <LeaderboardBar
              key={index}
              rank={index + 1}
              name={user.name}
              points={user.points}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-[48%] flex-1">
        <div className="bg-slate-200 flex flex-col items-center p-4 border rounded-xl h-[15vh] md:h-[30%] text-center text-black font-black">
          YOUR EARNING
          <div className="flex items-center justify-center mx-auto my-5 space-x-2">
            <img
              src="https://i.ibb.co/2SwpD66/a.png"
              alt="Aura coin"
              className="w-12 md:w-14 aspect-square"
            />
            <span className="text-2xl md:text-3xl text-green-700">298</span>
          </div>
        </div>
        <div className="bg-orange-200 p-4 border rounded-xl text-center text-black font-black">
          REWARDS
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[calc(30vh+70px)] md:max-h-[60vh] overflow-y-auto p-2 hide-scrollbar">
            <SmallRewardCard />
            <SmallRewardCard />
            <SmallRewardCard />
            <SmallRewardCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
