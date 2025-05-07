import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="text-center">
        <h1 className="mb-5" style={{ fontSize: "3rem", fontWeight: "bold", color: "#343a40" }}>
          Welcome to EduSync
        </h1>
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;