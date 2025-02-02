import React from 'react';

const About = () => {
  return (
    <div className="w-full mt-8 px-4 md:px-20 py-8 bg-blue-100 shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-300">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">About Us</h1>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Welcome to our platform! We are dedicated to providing a streamlined solution for educational administrators to manage teachers, students, and courses with ease. Our system is designed to be intuitive and user-friendly, allowing institutions to handle data efficiently and focus on what matters most: education.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Our platform features an array of functionalities that simplify the tasks of adding, editing, and removing teacher and student profiles, managing courses, and handling assignments. With an emphasis on security and efficiency, we prioritize making sure every administrator’s experience is smooth and productive.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Developed by a passionate team, we constantly work on improving the platform to meet the evolving needs of educational institutions. Your feedback is invaluable to us, and we strive to enhance our platform to meet the demands of modern education.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Thank you for being a part of our journey. We look forward to supporting your institution's mission and making administrative tasks easier, so you can dedicate more time to nurturing student success.
      </p>
    </div>
  );
};

export default About;