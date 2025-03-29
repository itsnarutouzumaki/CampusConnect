import React, { useEffect, useState } from 'react';

const ViewResult = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with your API endpoint
        const fetchResult = async () => {
            try {
                const response = await fetch('https://api.example.com/quiz/result');
                if (!response.ok) {
                    throw new Error('Failed to fetch result');
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
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Quiz Result</h1>
                {result ? (
                    <div className="space-y-2">
                        <p className="text-lg">
                            <strong>Score:</strong> {result.score}
                        </p>
                        <p className="text-lg">
                            <strong>Total Questions:</strong> {result.totalQuestions}
                        </p>
                        <p className="text-lg">
                            <strong>Correct Answers:</strong> {result.correctAnswers}
                        </p>
                        <p className="text-lg">
                            <strong>Remarks:</strong> {result.remarks}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No result available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewResult;