import React from "react";
import axios from "axios";

function ResetPassword() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/resetPassword", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Response:", response.data); // Handle success response
            alert("Password reset successful!");
        }
         catch (error) {
            console.error("There was an error!", error); // Handle error response
            alert("Failed to reset password. Please try again.");
        }
    };
    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ fontWeight: "bold" }}>
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        style={{
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                    <div id="emailHelp" className="form-text" style={{ fontSize: "12px", color: "#6c757d" }}>
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ fontWeight: "bold" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        style={{
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label" style={{ fontWeight: "bold" }}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        style={{
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        backgroundColor: "#007bff",
                        border: "none",
                    }}
                >
                    Submit
                </button>
            </form>
        </>
    );
}
export default ResetPassword;
