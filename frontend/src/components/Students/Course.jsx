import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// CourseCard component to display individual course
const CourseCard = ({ id,image, name, description }) => {
  const truncate = (text, wordLimit) => {
    const words = text;
    return words.length > wordLimit
      ? words.slice(0, wordLimit) + " ..."
      : text;
  };

  return (
    <Link
      to='/coursedetails/${id}'
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
  const [courses, setCourses] = useState([]) 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/course/getallcourses');
        setCourses(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="h-screen w-full p-6 mx-auto">
      <h1 className="text-white font-bold text-2xl my-4">Your Enrolled</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course.img}
              name={course.name}
              description={course.description}
            />
          ))
        ) : (
          <p>No courses available or loading...</p>
        )}
      </div>
      <h1 className="text-white font-bold text-2xl my-4">Live Course</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course.img}
              name={course.name}
              description={course.description}
            />
          ))
        ) : (
          <p>No courses available or loading...</p>
        )}
      </div>
      <h1 className="text-white font-bold text-2xl my-4">Upcoming Course</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard
              key={index}
              image={course.img}
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
