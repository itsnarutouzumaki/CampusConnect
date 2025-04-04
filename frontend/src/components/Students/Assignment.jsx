import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

// Single Assignment Item
const AssignmentBar = ({ assignment, studentId }) => {
  const { dueDate, iscompleted, title, _id } = assignment;

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  const handleToggleCompletion = async (url) => {
    const data = {
      assignmentId: _id,
      studentId,
      fileUrl: url,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/assignment/submitAssignment",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Your assignment has been submitted successfully", {
        position: "top-center",
        duration: 2000,
      });
      setIsCompleted(true);
    } catch (error) {
      toast.error("Error occurred while submitting assignment", {
        position: "top-center",
        duration: 2000,
      });
      console.error(error);
    }
  };

  const handleUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt,.jpg,.png";

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
          handleToggleCompletion(uploadedUrl);
          toast.success("Your file has been uploaded successfully", {
            position: "top-center",
            duration: 2000,
          });
        } catch (error) {
          toast.error("Error occurred while uploading file", {
            position: "top-center",
            duration: 2000,
          });
          console.error(error);
        }
      }
    };

    fileInput.click();
  };

  return (
    <div
      className={`w-11/12 p-3 flex justify-between transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4
      ${isCompleted ? "border-green-500/50" : "border-red-500/50 "}
      hover:shadow-xl hover:shadow-blue-400/80`}
    >
      <div>
        <div className="flex justify-between w-full">
          <p className="text-xl text-white italic font-bold">{title}</p>
        </div>
        <div>
          <p className="text-base text-white/40 italic font-medium">
            {`at ${
              dueDate
                ? new Date(dueDate)
                    .toISOString()
                    .split("T")[1]
                    .split(":")
                    .slice(0, 2)
                    .join(":")
                : "N/A"
            } on ${
              dueDate ? new Date(dueDate).toISOString().split("T")[0] : "N/A"
            }`}
          </p>
        </div>
      </div>
      {/* Only show upload button if the due date has not expired */}
      {new Date(dueDate) > new Date() && !isCompleted && (
        <div className="flex items-center ">
          <div
            className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-white hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-white text-white bg-opacity-30"
            title="Upload File"
          >
            <MdOutlineFileUpload onClick={handleUpload} />
          </div>
        </div>
      )}
    </div>
  );
};

// Main Assignment Component
const Assignment = ({courseID}) => {
  const [assignments, setAssignments] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.post("/api/assignment/getAllAssignment", {
          courseId: courseID,
        });
        
        setAssignments(response.data.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignment();
  }, [studentId,courseID]);

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {assignments.map((assignment) => (
        <AssignmentBar
          key={assignment._id}
          assignment={assignment}
          studentId={studentId}
        />
      ))}
    </div>
  );
};

export default Assignment;
