import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function LiveClass() {
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [role, setRole] = useState("host");
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        name,
        role,
        roomId,
      };
  
      navigate(`/teacher/room/${roomId}`, { state: data });
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-300">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg w-96 transform transition duration-300 hover:scale-105"
          >
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              Join a Room
            </h1>
    
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 transition"
              required
            />
    
            <input
              type="text"
              name="roomId"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 transition"
              required
            />
    
            <div className="flex items-center justify-center space-x-6 mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="host"
                  checked={role === "host"}
                  onChange={() => setRole("host")}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700 font-medium">Host</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="audience"
                  checked={role === "audience"}
                  onChange={() => setRole("audience")}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700 font-medium">Audience</span>
              </label>
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Join Room
            </button>
          </form>
        </div>
      );
    }
    
    export default LiveClass;
