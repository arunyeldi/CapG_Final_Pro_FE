import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = isInstructor ? "Instructor" : "Student";

    try {
      const response = await fetch("http://localhost:5258/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        // If the response is not OK, parse the error and show it
        const errorData = await response.json();
        alert(errorData.message || "Registration failed!");
        return;
      }

      // Parse the success response
      const data = await response.json();
      alert(data.message || "Registration successful! Please log in.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="isInstructor"
              checked={isInstructor}
              onChange={(e) => setIsInstructor(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isInstructor">
              Register as Instructor
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="mt-3 text-center">
          <p>Already have an account? <a href="/">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;