import React, { useState,useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import EditTeacher from "../Modal/EditTeacher.Modal";
import AddCourse from "../Modal/AddCourse.modal";
import axios from "axios";
import ChangePassoword from "../Modal/TeacherChangePassword"; 
import toast from "react-hot-toast";
const CourseCard = ({id, image, name, description }) => {
  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  };

  return (
    <Link
      to={`/teacher/coursedetails/${id}`}
      className="bg-white/20 backdrop-blur-[10%] rounded-lg shadow-lg shadow-black/50 p-4 hover:shadow-2xl hover:shadow-black/80 cursor-pointer transition-shadow duration-300"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-white text-lg font-semibold">{name}</h3>
      <p className="text-gray-300 text-sm">{truncateDescription(description, 4)}</p>
    </Link>
  );
};

const TeacherProfile = () => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [showPassChangeModal,setShowPassChangeModal]=useState(false);
  const showChangePasswordClose=()=>setShowPassChangeModal(false);
  const closeModalAddCourse = () => setShowAddCourseModal(false);
  const closeModalEditTeacher = () => setShowEditTeacherModal(false);
const navigate = useNavigate();
  const handleLogoutRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/teachers/teacherlogout");
      if (response.data.success) {
        toast.success("Logout successful", {
          position: "top-center",
          duration: 2000,
        });
        console.log(response);
       await navigate("/loginsignup");
        
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.", {
        position: "top-center",
        duration: 2000,
      });
    }
  };
  // const Teacher = {
  //   name: "Master Jiraiya",
  //   username: "pervysage",
  //   qualification: ["Ph.D. (IITK)", "M.Tech (MNNIT)"],
  //   areaOfInterest: ["Membrane Separation", "Polymer Technology"],
  //   joiningDate: "01/01/2021",
  //   quote: "Jiraiya, the 'Pervy Sage'",
  //   email: 4.5,
  //   profileImage:
  //     "https://preview.redd.it/how-strong-is-jiraiya-v0-0hdtt6zrqycb1.jpg?width=450&format=pjpg&auto=webp&s=2a4969be966363c03b43dd59788f110d3929f6ca",
  //   bio:"Jiraiya is a fictional character in the Naruto manga and anime series created by Masashi Kishimoto. Introduced in the series' first part, he was a student of Third Hokage Hiruzen Sarutobi and one of the three"
  // };
   const [Teacher, setTeachers] = useState(
    {
      name:"",
      qualification:"",
      joiningDate:"",
      username:"",
      email:"",
      profileImage:"https://preview.redd.it/how-strong-is-jiraiya-v0-0hdtt6zrqycb1.jpg?width=450&format=pjpg&auto=webp&s=2a4969be966363c03b43dd59788f110d3929f6ca",
      bio:""
    }
   );
    useEffect(() => {  
      const fetchTeacher=async()=>
        {
          const response=await axios.post("/api/teachers/getTeacher");
          console.log(response);
          setTeachers(response.data.data);
        }
        fetchTeacher(); 
    }, []);
  const courseData = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1 ,
    image:
      "https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg",
    name: `Course ${i + 1}`,
    description: `This is a short description of Course ${i + 1}.`,
  }));
  const [Course, setCourse] = useState([
    
  ]);
  useEffect(() => {
    const fetchCourse=async()=>
      {
        const response=await axios.post("/api/course/courseByTeacher",
          
        );
        console.log(response);
        setCourse(response.data.data);
      }
      fetchCourse();  
  },[]);

  return (
    <div className="w-full">
      <div className="w-full mx-auto mt-3 px-4 py-2 bg-white/20 backdrop-blur-[10%] flex flex-col md:flex-row items-center md:items-start shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-300 relative">
        <div
          onClick={() => setShowEditTeacherModal(true)}
          className="absolute top-1 right-4 bg-purple-400 hover:bg-green-500 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
        >
          <FiEdit2 className="w-5 h-5" />
        </div>

        {showEditTeacherModal && <EditTeacher closeModal={closeModalEditTeacher} />}

        <div className="flex flex-col items-center md:items-start mt-6 md:m-2">
          <img
            className="w-48 h-48 rounded-full border object-cover"
            src={Teacher.profileImage || 'https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg'}
            />
          {/* <p className="w-full md:w-48 text-white italic mt-3 text-center md:text-left">
            <span className="text-3xl text-red-500">❝</span>
            {Teacher.quote}
            <span className="text-3xl text-red-500">❞</span>
          </p> */}
        </div>

        <div className="flex flex-col items-center md:items-start mt-6 md:ml-6 text-center md:text-left">
          <p className="text-white font-bold text-2xl mb-3">
            {Teacher.name} {" "}
            <span className="text-slate-300 italic underline text-lg">
              (@{Teacher.username})
            </span>
          </p>

          <p className="mb-1">
            <span className="text-white font-bold text-lg">Joining:{" "}</span>
            <span className="text-white italic">{Teacher.joiningDate}</span>
          </p>

          <p className="mb-1">
            <span className="text-white font-bold text-lg">email:</span>
            <span className="text-white italic">{Teacher.email}</span>
          </p>
          <p className="mb-1">
            <span className="text-white font-bold text-lg">Qualification:</span>{" "}
            <span className="text-white italic">{Teacher.qualification}</span>
          </p>

          {/* <p className="mb-1">
            <span className="text-white font-bold text-lg">Interest:</span>{" "}
            <span className="text-white italic">{Teacher.areaOfInterest.join(", ")}</span>
          </p> */}

          <p className="mb-1">
            <span className="text-white font-bold text-lg">bio:</span>{" "}
            <span className="text-white italic">{Teacher.bio}</span>
          </p>
        </div>
      </div>
      <div className="w-full h-fit bg-white/20 mb-2 rounded-lg flex justify-evenly py-2">
          <button className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          onClick={() => setShowPassChangeModal(true)}>
       { showPassChangeModal &&    <ChangePassoword closeModal={showChangePasswordClose}/>}
            Change Password
          </button>
          <button onClick={handleLogoutRequest}
           className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer">
            Logout
          </button>
        </div>

      <div className="w-full flex flex-col items-center rounded-lg bg-white/20 backdrop-blur-[10%] p-2 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold underline text-white mb-4">
          Your Courses
        </h2>

        <div className="w-full p-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {Course.map((course, index) => (
              <CourseCard
                key={index}
                id={course._id}
                image={course.image}
                name={course.title}
                description={course.description}
              />
            ))}
          </div>
        </div>

        <div
          onClick={() => setShowAddCourseModal(true)}
          className=" font-san bg-purple-400 hover:bg-purple-600 text-white font-semibold cursor-pointer px-6 py-3 mt-8 rounded-lg  transition-colors hover:shadow-2xl hover:shadow-black/80 duration-200"
        >
           Add Course
        </div>
      </div>
      {showAddCourseModal && <AddCourse closeModal={closeModalAddCourse} />}
    </div>
  );
};

export default TeacherProfile;
