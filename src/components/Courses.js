import React, { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view courses.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5258/api/Courses/allcourses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch courses!");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="container mt-5"><h2>Loading courses...</h2></div>;
  }

  if (error) {
    return <div className="container mt-5"><h2>{error}</h2></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available right now.</p>
      ) : (
        <ul className="list-group">
          {courses.map((course) => (
            <li key={course.CourseId} className="list-group-item">
              <h5>{course.Title}</h5>
              <p>{course.Description}</p>
              {course.MediaUrl && (
                <div>
                  <p>Media:</p>
                  <a href={course.MediaUrl} target="_blank" rel="noopener noreferrer">
                    View Media
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;