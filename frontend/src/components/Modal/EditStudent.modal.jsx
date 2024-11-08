import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const EditStudent = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full sm:w-[500px] z-50 flex flex-col text-center shadow-lg hover:border-2 hover:border-white hover:shadow-2xl hover:shadow-gray-500 transition-all" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">EditStudent</h2>
        <p className="text-sm mb-4">Subscribe to our newsletter and never miss our designs, latest news, etc. Our newsletter is sent once a week, every Monday.</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition-colors" onClick={closeModal}>Accept It</button>
      </div>
    </div>,
    document.querySelector('.myPortalModalDiv')
  )
}

export default EditStudent
