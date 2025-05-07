import React, { useState, useEffect, useCallback } from "react";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Memoize fetchMyCourses using useCallback
  const fetchMyCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5258/api/Courses/mycourses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to fetch courses.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Ensure the response is an array
      if (Array.isArray(data)) {
        setCourses(data);
      } else if (data.courses) {
        setCourses(data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage("An error occurred while fetching courses.");
    } finally {
      setLoading(false);
    }
  }, [token]); // Add 'token' as a dependency

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]); // Add 'fetchMyCourses' as a dependency

  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to add a course.");
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    if (mediaFile) {
      formData.append("MediaFile", mediaFile);
    }

    try {
      const response = await fetch("http://localhost:5258/api/Courses", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add course.");
        return;
      }

      const data = await response.json();
      setMessage(data.message || "Course added successfully!");
      setTitle("");
      setDescription("");
      setMediaFile(null);
      fetchMyCourses(); // Refresh the course list
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("An error occurred while adding the course.");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`http://localhost:5258/api/Courses/delcourse/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to delete course.");
        return;
      }

      setMessage("Course deleted successfully!");
      fetchMyCourses(); // Refresh the course list
    } catch (error) {
      console.error("Error deleting course:", error);
      setMessage("An error occurred while deleting the course.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Instructor Dashboard</h2>
      <p>Welcome, Instructor! Here you can manage your courses.</p>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card p-4 mt-4">
        <h4>Add a New Course</h4>
        <form onSubmit={handleAddCourse}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Course Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Course Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mediaFile" className="form-label">Media File (optional)</label>
            <input
              type="file"
              className="form-control"
              id="mediaFile"
              onChange={(e) => setMediaFile(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Course</button>
        </form>
      </div>

      <div className="mt-5">
        <h4>My Courses</h4>
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul className="list-group">
            {courses.map((course) => (
              <li key={course.CourseId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{course.Title}</h5>
                  <p>{course.Description}</p>
                  {course.MediaUrl && (
                    <a href={course.MediaUrl} target="_blank" rel="noopener noreferrer">
                      View Media
                    </a>
                  )}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCourse(course.CourseId)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;