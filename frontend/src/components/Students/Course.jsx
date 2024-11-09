<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Fetch all courses
const fetchCourse = async () => {
  try {
    const response = await axios.get('http://localhost:1000/backend/course/all');
    console.log(response.data.course);  // Log the correct data to verify the structure
    return response.data.course;  // Return the data (make sure it's an array)
  } catch (err) {
    console.error('Error fetching courses:', err.message);
    return [];  // In case of an error, return an empty array
  }
};
=======
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const course=async()=>{
  const [courseData, setCourseData] = useState({
    name: "",
    code: "",
    description: "",
    credit: 0,
    duration: "",
    startDate: "",
    endDate: "",
    enrollmentCount: 0,
    createdAt: new Date().toISOString(),
});
>>>>>>> Stashed changes


const [courses, setCourses] = useState([]);


const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
};

// add a course
const addCourse = async () => {
    try {
        const response = await axios.post('/backend/course/add', courseData);
        console.log(response.data.message);
        fetchCourses(); 
    } catch (error) {
        console.log("Error: " + error.response.data.message);
    }
};

// Function to fetch all courses
const fetchCourses = async () => {
    try {
        const response = await axios.get('/backend/course');
        setCourses(response.data.course);
    } catch (error) {
        console.error("Error fetching courses: ", error);
    }
};

useEffect(() => {
    fetchCourses();
}, []);

}
const CourseCard = ({ image, name, description }) => {
  return (
    <Link
      to='/assignment'
      className="bg-red-700 rounded-lg shadow-lg shadow-black/50 p-4 hover:shadow-2xl hover:shadow-black/80 cursor-pointer transition-shadow duration-300"
    >
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h3 className="text-white text-lg font-semibold">{name}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  );
};

const Course = () => {
  const [course, setCourse] = useState([]);  // Initialize state as an empty array

  useEffect(() => {
    const getCourses = async () => {
      const fetchedCourses = await fetchCourse();
      if (Array.isArray(fetchedCourses)) {
        setCourse(fetchedCourses);  // Only set if it's an array
      } else {
        setCourse([]);  // Set to empty array if it's not an array
      }
    };
    getCourses();
  }, []);

  return (
    <div className="h-screen w-full p-6 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(course) && course.length > 0 ? (
          course.map((course, index) => (
            <CourseCard
              key={index}
              image={course.img}  // Fallback image
              name={course.name}
              description={course.description}
            />
          ))
        ) : (
          <p>No courses available or loading...</p>  // Show message when no courses are available
        )}
      </div>
    </div>
  );
};

export default Course;
