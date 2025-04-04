import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RotatingC from "../Loading";

const CourseCard = ({ id, image, name, description }) => {
  const truncate = (text, wordLimit) => {
    return text.length > wordLimit ? text.slice(0, wordLimit) + " ..." : text;
  };

  return (
    <Link
      to={`/coursedetails/${id}`}
      className="bg-white/20 backdrop-blur-[10%] rounded-lg shadow-lg shadow-black/50 p-4 hover:shadow-2xl hover:shadow-black/80 cursor-pointer transition-shadow duration-300"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-white text-lg font-semibold">{truncate(name, 35)}</h3>
      <p className="text-gray-300 text-sm">{truncate(description, 35)}</p>
    </Link>
  );
};

const Course = () => {
  const [courses, setCourses] = useState({
    enrolled: [],
    live: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!localStorage.getItem("userName")) {
        toast.error("You are not logged in", {
          position: "top-center",
          duration: 2000,
        });
        Navigate("/loginsignup");
        return;
      }
      try {
        const response = await axios.post("/api/course/getallcourses", {
        });
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <RotatingC/>
    );
  }

  return (
    <div className="h-screen w-full p-6 mx-auto">
      {courses.enrolled.length > 0 && (
        <>
          <h1 className="text-white font-bold text-2xl my-4">Your Enrolled</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.enrolled.map((course, index) => (
              <CourseCard
                key={`${course._id}-${index}`}
                id={course._id}
                image={course.image}
                name={course.title}
                description={course.description}
              />
            ))}
          </div>
        </>
      )}

      {courses.live.length > 0 && (
        <>
          <h1 className="text-white font-bold text-2xl my-4">Live Courses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.live.map((course, index) => (
              <CourseCard
                key={`${course._id}-${index}`}
                id={course._id}
                image={course.image}
                name={course.title}
                description={course.description}
              />
            ))}
          </div>
        </>
      )}

      {courses.upcoming.length > 0 && (
        <>
          <h1 className="text-white font-bold text-2xl my-4">
            Upcoming Courses
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.upcoming.map((course, index) => (
              <CourseCard
                key={`${course._id}-${index}`}
                id={course._id}
                image={course.image}
                name={course.title}
                description={course.description}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
