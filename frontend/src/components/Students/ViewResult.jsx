import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ViewResult = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("quizId"); // Get quizId from URL params

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchResult = async () => {
            try {
              
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1]; // Extract token from cookies

                if (!token) {
                    throw new Error("User is not authenticated. Please log in.");
                }
                if (!quizId) {
                    throw new Error("Quiz ID is required.");
                }

                const response = await axios.get(`https://campusconnect-qm43.onrender.com/quiz/submitquiz`, {
                   
                    body:{
                        quizid:quizid
                    }, // Pass quizId as query parameter
                });

                setResult(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [quizId]);
    useEffect(() => {
        const fetchResult = async () => {
            try {
                // Get the auth token from localStorage (or context if used)
                const token = localStorage.getItem("token"); // Ensure token is stored in localStorage when logging in

                if (!token) {
                    throw new Error("User is not authenticated. Please log in.");
                }
                if (!quizId) {
                    throw new Error("Quiz ID is required.");
                }

                const response = await fetch(`http://localhost:8000/quiz/submitquiz?quizId=${quizId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Send token in headers
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch result");
                }

                const data = await response.json();
                setResult(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [quizId]);

    if (loading) return <div className="text-lg font-semibold text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-lg font-semibold text-center">Error: {error}</div>;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Quiz Result</h1>
                {result ? (
                    <div className="space-y-2">
                        <p className="text-lg"><strong>Quiz ID:</strong> {result.quizId}</p>
                        <p className="text-lg"><strong>Student ID:</strong> {result.studentId}</p>
                        <p className="text-lg"><strong>Marks:</strong> {result.marks}</p>
                        <p className="text-lg"><strong>Total Marks:</strong> {result.totalMarks}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No result available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewResult;
