import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// CourseCard component to display individual course
const CourseCard = ({ image, name, description }) => {
  const truncate = (text, wordLimit) => {
    const words = text;
    return words.length > wordLimit
      ? words.slice(0, wordLimit) + " ..."
      : text;
  };

  return (
    <Link
      to="/TeacherCourseDetails"
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
  const [courses, setCourses] = useState([
    {
      id: 1,
      img: "https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg",
      name: "Introduction to Programming",
      description: "Learn the basics of programming with Python and JavaScript."
    },
    {
      id: 2,
      img: "https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg",
      name: "Data Structures & Algorithms",
      description: "Master fundamental data structures and algorithms for coding interviews."
    },
    {
      id: 3,
      img: "https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg",
      name: "Full Stack Web Development",
      description: "Build real-world web applications with React, Node.js, and MongoDB."
    },
    {
      id: 4,
      img: "https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg",
      name: "Machine Learning Basics",
      description: "Understand key concepts of machine learning and build predictive models."
    }
  ]);

  // const fetchCourses = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:1000/backend/course/all"
  //     );
  //     setCourses(response.data.course || []);
  //   } catch (error) {
  //     console.error("Error fetching courses: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

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
