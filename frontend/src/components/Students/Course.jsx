import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// CourseCard component to display individual course
const CourseCard = ({ image, name, description }) => {
  return (
    <Link
      to="/assignment"
      className="bg-red-700 rounded-lg shadow-lg shadow-black/50 p-4 hover:shadow-2xl hover:shadow-black/80 cursor-pointer transition-shadow duration-300"
    >
      <img
        src={image || "default-image.jpg"} // Fallback image if no image provided
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-white text-lg font-semibold">{name}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  );
};

const Course = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/backend/course/all"
      );
      setCourses(response.data.course || []);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="h-screen w-full p-6 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course.img} // Fallback image can be provided here too
              name={course.name}
              description={course.description}
            />
          ))
        ) : (
          <p>No courses available or loading...</p>
        )}
      </div>
    </div>
  );
};

export default Course;
