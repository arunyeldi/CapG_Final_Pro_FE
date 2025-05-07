import React from "react";
import { Link, Route } from "react-router-dom";
import Login from "./Login";

const HomePage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="text-center">
        <h1 className="mb-4" style={{ fontSize: "3rem", fontWeight: "bold", color: "#343a40" }}>
          Welcome to EduSync
        </h1>
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
      </div>
    </div>
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const role = isInstructor ? "Instructor" : "Student";
  const response = await fetch("http://localhost:5000/api/Users/Register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password, role }),
  });
  const data = await response.json();
  if (response.ok) {
    alert("Registration successful! Please log in.");
    window.location.href = "/";
  } else {
    alert(data || "Registration failed!");
  }
};

const App = () => {
  return (
    <Route path="/login" element={<Login />} />
  );
};

export default HomePage;