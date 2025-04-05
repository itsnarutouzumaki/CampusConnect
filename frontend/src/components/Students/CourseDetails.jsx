import React, { useEffect, useState } from "react";
import Assignment from "./Assignment";
import Chapter from "./Chapter";
import Lecture from "./Lecture";
import Quiz from "./Quiz";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import RotatingC from "../Loading";
import toast from "react-hot-toast";


const StudentCourseDetails = () => {
  const [selectedOption, setSelectedOption] = useState("Chapter");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseData, setCourseData] = useState(null);

  const { courseId } = useParams();

  const enrollMe = async() => {
    const studentId = localStorage.getItem("studentId");
    
    try {
      const response = await axios.post("/api/course/enrollstudent", {
        course_id:courseId,
      });
      setIsEnrolled(true);
      //console.log(response.data);
      toast.success("Enrolled Successfully", {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Enrollment Failed", {
        position: "top-center",
        duration: 2000,
      });
    }
    
    
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      toast.error("You are not logged in", {
        position: "top-center",
        duration: 2000,
      });
      navigate("/loginsignup");
    }
    const fetchCourseDetails = async () => {
      try {console.log(localStorage.getItem(
        "studentId"
      ));
        const response = await axios.post(
          `/api/course/isEnrolled/${courseId}/${localStorage.getItem(
            "studentId"
          )}`
        );
     //   console.log(response);
        const { isEnrolled, course } = response.data.data;

        setIsEnrolled(isEnrolled === "true");
        setCourseData(course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const renderContent = () => {
    switch (selectedOption) {
      case "Assignment":
        return <Assignment courseID={courseId} />;
      case "Chapter":
        return <Chapter courseID={courseId} />;
      case "Lecture":
        return <Lecture courseID={courseId} />;
      case "Quiz":
        return <Quiz courseID={courseId} />;
      default:
        return <Chapter courseID={courseId} />;
    }
  };

  if (!courseData) {
    return <RotatingC />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 sm:py-10">
      <div className="bg-white/20 backdrop-blur-[10%] w-full p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-white flex flex-col relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 italic text-center">
          {courseData.title}
        </h1>

        <div className="flex flex-col items-start space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
          <p>
            <span className="font-semibold">Course ID:</span>{" "}
            <span className="italic">{courseData.courseId}</span>
          </p>
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            <span className="italic">
              {new Date(courseData.startDate).toLocaleDateString()}
            </span>
          </p>
          <p>
            <span className="font-semibold">Expiry Date:</span>{" "}
            <span className="italic">
              {new Date(courseData.expiryDate).toLocaleDateString()}
            </span>
          </p>
          <p>
            <span className="font-semibold">Coordinator:</span>{" "}
            <a href="#" className="italic text-green-600">
              {courseData.coordinator}
            </a>
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6">
            <span className="font-semibold">Description:</span>{" "}
            <span className="italic">{courseData.description}</span>
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6">
            <span className="font-semibold">Course Details:</span>{" "}
            <a
              href={courseData.pdfLink}
              className="text-blue-500 italic underline"
              target="_blank" rel="noopener noreferrer"
            >
              View Pdf 📑
            </a>
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="w-full flex mt-6 sm:mt-8">
          {!isEnrolled ? (
            
            <div
              onClick={enrollMe}
              className="cursor-pointer font-bold text-lg text-white bg-blue-300 hover:bg-purple-600 italic py-2 rounded-lg w-fit px-10"
            >
              <Link
            to={`/payment`}
            state={{"title":courseData.title,
              "image":courseData.image,
              "id":courseData._id,
              "price":courseData.price,
              "description":courseData.description,
            }}
            >
              Enroll
              </Link>
          
            </div>
          ) : (
            <select
              className="bg-black text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Chapter">Chapter</option>
              <option value="Assignment">Assignment</option>
              <option value="Lecture">Lecture</option>
              <option value="Quiz">Quiz</option>
            </select>
          )}
        </div>
      </div>

      {/* Render Selected Section */}
      {isEnrolled && renderContent()}
    </div>
  );
};

export default StudentCourseDetails;
