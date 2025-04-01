import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AssignmentBar = ({ assignment }) => {
  const {
    AssignmentName,
    marks,
    totalmarks,
    assignmentDueDate,
    assignmentDueTime,
    completed: initialCompleted,
  } = assignment;

  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [url, setUrl] = useState("");

  const handleToggleCompletion = async () => {
    if (!url) {
      alert("Please upload a file first!");
      return;
    }

    const data = {
      assignmentId: "67eaa06a86a568b53909b7f9",
      studentId: "67a36a59e0224d1df4237c04",
      fileUrl: url,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/assignment/submitAssignment",
        data,
        {
          headers: {
        "Content-Type": "application/json",
          },
        }
      );

      console.log("Submission Response:", response.data);

      // if (response.status === 200) {
      //   setIsCompleted(true);
      //   setUrl(""); // Clear the file path after submission
      // }
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  const handleUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt,.jpg,.png"; // Allowed file types

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(
            "http://localhost:8000/api/assignment/uploadFile",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          const uploadedUrl = response.data.data.url;
          console.log("Uploaded File URL:", uploadedUrl);
          setUrl(uploadedUrl);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        console.log("No file selected.");
      }
    };

    fileInput.click();
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
          to={xyz}
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
            onClick={handleUpload}
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
