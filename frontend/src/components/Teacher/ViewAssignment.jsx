import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewAssignment({ assignment_id }) {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/assignment/viewAssignment", {
                    assignment_id  // Sending data in the request body
                });
                setStudentData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (assignment_id) fetchData();
    }, [assignment_id]);

    // Function to fetch student name by studentId
    const fetchStudentName = async (studentId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/student/getStudentInfo`, {
            student_id: studentId,
            });
            return response.data.name;  // Assuming API returns { name: "John Doe" }
        } catch (error) {
            console.error("Error fetching student name:", error);
            return "Unknown";  // Fallback name
        }
    };

    const [studentNames, setStudentNames] = useState({});

    useEffect(() => {
        const getNames = async () => {
            const namesMap = {};
            for (const student of studentData) {
                namesMap[student.studentId] = await fetchStudentName(student.studentId);
            }
            setStudentNames(namesMap);
        };

        if (studentData.length > 0) getNames();
    }, [studentData]);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Assignment Submissions</h2>
            {studentData.map((student, index) => (
                <div 
                    key={index} 
                    style={{ 
                        marginBottom: "20px", 
                        padding: "15px", 
                        border: "1px solid #ddd", 
                        borderRadius: "8px", 
                        backgroundColor: "#fff", 
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
                    }}
                >
                    <p style={{ margin: "5px 0", color: "#555" }}>
                        <strong>Name:</strong> {studentNames[student.studentId] || "Loading..."}
                    </p>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                        <strong>File:</strong> <a href={student.file} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none" }}>Download</a>
                    </p>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                        <strong>Timestamp:</strong> {new Date(student.timestamp).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ViewAssignment;
