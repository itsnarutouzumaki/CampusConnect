import React, { useState } from "react";

function LiveClass() {
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [role, setRole] = useState("Host");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/join-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, roomID, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join the room.");
      }

      alert("Joined Room Successfully!");
      // Redirect or update UI as needed
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Join a Room
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 transition"
          />

          <input
            type="text"
            placeholder="Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 transition"
          />

          <div className="flex items-center justify-center space-x-6 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="Host"
                checked={role === "Host"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-blue-500 focus:ring-blue-400"
              />
              <span className="text-gray-700 font-medium">Host</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="Audience"
                checked={role === "Audience"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-blue-500 focus:ring-blue-400"
              />
              <span className="text-gray-700 font-medium">Audience</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join Room"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LiveClass;
