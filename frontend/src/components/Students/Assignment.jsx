import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AssignmentBar = ({ assignment }) => {
  const { title, dueDate, completed, url } = assignment;
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggleCompletion = () => {
    setIsCompleted((prevState) => !prevState);
  };

  return (
    <div
      className={`w-11/12 p-3 flex flex-col transition-all duration-300 mx-auto m-3 rounded-2xl border-4 
      ${
        isCompleted
          ? "border-white shadow-[0_0_15px_#00ff00]"
          : "border-white shadow-[0_0_15px_#ff0000]"
      }`}
    >
      <div className="flex justify-between w-full">
        <Link
          to={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white font-bold"
        >
          {title}
        </Link>
      </div>
      <div className="flex justify-between w-full mt-2">
        <div>
        <span className="text-base italic text-white/40 font-medium">
        {"At "}
            {dueDate
              ? new Date(dueDate)
                  .toISOString()
                  .split("T")[1]
                  .split(":")
                  .slice(0, 2)
                  .join(":")
              : "N/A"}
              {" on "}
          </span>
          <span className="text-base italic text-white/40 font-medium">
            {dueDate ? new Date(dueDate).toISOString().split("T")[0] : "N/A"}
          </span>
          
        </div>
        <div className="flex items-center">
          <div
            className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-white hover:font-bold 
            hover:shadow-[0px_0px_15px_#00ff00] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30"
          >
            <MdOutlineFileUpload />
          </div>
          <div
            onClick={handleToggleCompletion}
            className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-white hover:font-bold 
            hover:shadow-[0px_0px_15px_#00ff00] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30"
          >
            {isCompleted ? "Unsubmit" : "Submit"}
          </div>
        </div>
      </div>
    </div>
  );
};

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchAssignments = async () => {
      console.log(courseId);
      try {
        const response = await axios.post("/api/assignment/getAllAssignment", {
          courseId,
        });
        setAssignments(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [courseId]);

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {assignments.map((assignment, index) => (
        <AssignmentBar key={assignment.id || index} assignment={assignment} />
      ))}
    </div>
  );
};

export default Assignment;
