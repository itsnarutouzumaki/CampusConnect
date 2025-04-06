import React, { useEffect,useState } from "react";
import { MdDelete,MdEdit } from "react-icons/md";
import EditChapter from "../Modal/EditChapter.modal";
import RemoveChapter from "../Modal/RemoveChapter.modal";
import axios from 'axios';
const ChapterBar = ({ chapter }) => {
  const { title } = chapter;
  const id=chapter._id;
  const [showRemoveChapterModal, setShowRemoveChapterModal] = useState(false);
  const closeModalRemoveChapter = () => setShowRemoveChapterModal(false);

  const [showEditChapterModal, setShowEditChapterModal] = useState(false);
  const closeModalEditChapter = () => setShowEditChapterModal(false);
  return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg  justify-between items-center"
    >
      <p className="text-xl italic text-white font-sans">{title}</p>
      <div className="flex p-1">
        <div
          onClick={() => setShowEditChapterModal(true)}
          className="cursor-pointer w-fit h-fit text-white mr-2 bg-white/30 p-1 rounded-md hover:text-black hover:bg-orange-300"
        >
          <MdEdit />
        </div>
        <div
          onClick={() => setShowRemoveChapterModal(true)}
          className="cursor-pointer h-fit w-fit text-white mr-2 bg-white/30 p-1 rounded-md hover:text-black hover:bg-orange-300"
        >
          <MdDelete />
        </div>
      </div>
      {showEditChapterModal && (
        <EditChapter closeModal={closeModalEditChapter} chapterID={id} />
      )}
      {showRemoveChapterModal && (
        <RemoveChapter closeModal={closeModalRemoveChapter} chapterID={id}/>
      )}
    </div>
  );
};

// Main Chapter Component
const Chapter = ({courseID}) => {
  const [chapters, setChapters] = useState([]);
 // const { courseId } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.post(
          "/api/chapterLecture/getAllChapters",
          {
            course_id:  courseID,
          }
        );
        
        setChapters(response.data.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, [courseID]);

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {chapters.map((chapter, index) => (
        <ChapterBar key={index} chapter={chapter} />
      ))}
    </div>
  );
};

export default Chapter;
