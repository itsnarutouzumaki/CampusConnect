import React from 'react';
import { FiEdit2 } from "react-icons/fi";
import { Link } from 'react-router-dom';

const CourseCard = ({ image, name, description }) => {
  return (
    <Link to='/assignment' className="bg-red-700 rounded-lg shadow-lg shadow-black/50 p-4 hover:shadow-2xl hover:shadow-black/80 cursor-pointer transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h3 className="text-white text-lg font-semibold">{name}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  );
};

const TeacherProfile = () => {
  const courseData = [
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 1',
      description: 'This is a short description of Course 1.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 2',
      description: 'This is a short description of Course 2.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 3',
      description: 'This is a short description of Course 3.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 4',
      description: 'This is a short description of Course 4.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 5',
      description: 'This is a short description of Course 5.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 6',
      description: 'This is a short description of Course 6.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 7',
      description: 'This is a short description of Course 7.',
    },
    {
      image: 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg',
      name: 'Course 8',
      description: 'This is a short description of Course 8.',
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full mx-auto mt-3 px-4 py-2 bg-red-400 flex flex-col md:flex-row items-center md:items-start shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-300 relative">
        
        {/* Edit Icon in Circle */}
        <div className="absolute top-1 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
          <FiEdit2 className="w-5 h-5" />
        </div>

        {/* Profile Image and Quote */}
        <div className="flex flex-col items-center md:items-start mt-6 md:m-2">
          <img
            className="w-48 h-48 rounded-full border object-cover"
            src="https://preview.redd.it/how-strong-is-jiraiya-v0-0hdtt6zrqycb1.jpg?width=450&format=pjpg&auto=webp&s=2a4969be966363c03b43dd59788f110d3929f6ca"
            alt="Teacher Profile"
          />
          <p className="w-full md:w-48 text-gray-700 italic mt-3 text-center md:text-left">
            <span className="text-3xl text-gray-500">❝</span>
            Love to learn and love to teach together
            <span className="text-3xl text-gray-500">❞</span>
          </p>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col items-center md:items-start mt-6 md:ml-6 text-center md:text-left">
          <p className="text-black font-bold text-2xl mb-0.5">Master Jiraiya</p>
          <p><span className="text-black font-bold text-lg">Designation:</span> Professor & Head</p>
          <p><span className="text-black font-bold text-lg">Qualification:</span> Ph.D. (IITK)</p>
          <p><span className="text-black font-bold text-lg">Area of Interest:</span> Membrane Separation, Polymer Technology.</p>
          <h3 className="text-lg md:text-xl underline font-semibold text-gray-800 mt-2">Bio:</h3>
          <p className="text-gray-900 mt-2 text-sm md:text-base leading-relaxed">
            Jiraiya, the "Pervy Sage," is a legendary ninja from the Hidden Leaf and one of the revered Sannin. Known for his powerful jutsu and playful spirit, he trained future heroes, including Naruto Uzumaki. Beneath his eccentric exterior lies a wise, courageous mentor whose legacy endures through his teachings and unwavering will.
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="w-full flex flex-col items-center my-4 rounded-lg bg-green-500 p-2 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold underline text-gray-800 mb-4">Your Courses</h2>

        <div className="w-full p-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center ">
            {courseData.map((course, index) => (
              <CourseCard
                key={index}
                image={course.image}
                name={course.name}
                description={course.description}
              />
            ))}
          </div>
        </div>

        {/* Add Course Button */}
        <button className="bg-blue-500 text-white font-semibold px-6 py-3 mt-8 rounded-lg hover:bg-blue-600 transition-colors hover:shadow-2xl hover:shadow-black/80 duration-200">
          + Add Course
        </button>
      </div>
    </div>
  );
};

export default TeacherProfile;
