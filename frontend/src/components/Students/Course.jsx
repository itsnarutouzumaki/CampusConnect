import React from 'react';
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

const Course = () => {
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
    <div className="h-screen w-full p-6 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
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
  );
};

export default Course;
