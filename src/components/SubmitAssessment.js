import React, { useState } from "react";

const SubmitAssessment = () => {
  const [assessmentId, setAssessmentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [userId, setUserId] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submittedAt, setSubmittedAt] = useState(new Date().toISOString());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the JWT token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to submit an assessment.");
      return;
    }

    const assessmentData = {
      assessmentId,
      courseId,
      userId,
      instructorEmail,
      answers,
      score,
      submittedAt,
    };

    try {
      const response = await fetch("http://localhost:5258/api/Assessments/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        alert(errorData.message || "Failed to submit assessment!");
        return;
      }

      const data = await response.json();
      alert(data.message || "Assessment submitted successfully!");
    } catch (error) {
      console.error("Error during assessment submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "500px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <h2 className="text-center mb-4">Submit Assessment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="assessmentId" className="form-label">Assessment ID</label>
            <input
              type="text"
              className="form-control"
              id="assessmentId"
              value={assessmentId}
              onChange={(e) => setAssessmentId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="courseId" className="form-label">Course ID</label>
            <input
              type="text"
              className="form-control"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="instructorEmail" className="form-label">Instructor Email</label>
            <input
              type="email"
              className="form-control"
              id="instructorEmail"
              value={instructorEmail}
              onChange={(e) => setInstructorEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="answers" className="form-label">Answers (JSON format)</label>
            <textarea
              className="form-control"
              id="answers"
              value={JSON.stringify(answers, null, 2)}
              onChange={(e) => setAnswers(JSON.parse(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="score" className="form-label">Score</label>
            <input
              type="number"
              className="form-control"
              id="score"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="submittedAt" className="form-label">Submitted At</label>
            <input
              type="datetime-local"
              className="form-control"
              id="submittedAt"
              value={submittedAt}
              onChange={(e) => setSubmittedAt(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit Assessment</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAssessment;