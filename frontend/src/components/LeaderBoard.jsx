import React, { useState } from "react";

const LeaderboardBar=()=>{
    return(
      <div className="w-full px-2 m-2 flex justify-between border- ">
        <div>

        </div>
        <div>
          {points}
        </div>
      </div>
    );
};

const RewardItem=()=>{
  return(
    <></>
  );
}

const Leaderboard = () => {
  const [auroPoint, setauroPoint] = useState(0);
  return (
    <div className="flex flex-col w-full h-screen md:flex-row gap-4 p-4">
      {/* Left Side (Leaderboard) */}
      <div className="bg-blue-100 flex-1 p-4 md:h-full w-full md:w-[48%] border text-center text-black font-black rounded-xl">
        LEADERBOARD
      </div>

      {/* Right Side (Your Earning and Rewards) */}
      <div className="flex flex-col gap-4 md:w-[48%] flex-1">
        <div className="bg-slate-200 flex flex-col align-middle p-4 border rounded-xl md:h-[30vh] md:h-[30%] text-center text-black font-black">
          YOUR EARNING
          <div className="flex items-center justify-center mx-auto my-5 space-x-2">
            <img
              src="https://i.ibb.co/2SwpD66/a.png"
              alt="Aura coin"
              className="w-14 mr-4 aspect-square"
            />
            <span className="text-3xl text-green-700">298</span>
          </div>
        </div>
        <div className="bg-orange-200 p-4 border h-[50vh] md:h-[70%] rounded-xl text-center text-black font-black">
          REWARDS
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
