import React, { useEffect, useState } from "react";
import "./coursestudy.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id, fetchCourse]);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscriptions.includes(params.id)) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  if (loading) return <Loading />;
  if (!course) return <div className="loading">Loading Course...</div>;

  return (
    <div className="udemy-course-page">
      {/* Header with long image */}
      <div className="udemy-course-header">
        <img src={`${server}/${course.image}`} alt={course.title} className="udemy-course-header-img" />
        <div className="udemy-course-header-overlay">
          <h1>{course.title}</h1>
          <div className="udemy-course-badges">
            <span className="badge instructor">Instructor: {course.createdBy}</span>
            <span className="badge duration">{course.duration} Week{course.duration > 1 ? "s" : ""}</span>
            <span className="badge students">{course.studentsCount || 0} Students</span>
          </div>
        </div>
      </div>

      {/* Main content + Sidebar */}
      <div className="udemy-course-content-wrapper">
        {/* Left main content */}
        <main className="udemy-course-main">
          {/* Course Description */}
          <section className="udemy-course-description">
            <h2>About this course</h2>
            <p>{course.description}</p>
          </section>

          {/* Course Syllabus */}
          {course.lectures?.length > 0 && (
            <section className="udemy-course-syllabus">
              <h2>Course Content</h2>
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="udemy-lecture-item">
                  <span>{idx + 1}.</span> {lecture.title}
                </div>
              ))}
            </section>
          )}
        </main>

        {/* Right sidebar */}
        <aside className="udemy-course-sidebar">
          <div className="sidebar-card">
            <img src={`${server}/${course.image}`} alt={course.title} className="sidebar-course-img" />
            <div className="sidebar-info">
              <p><strong>Category:</strong> {course.category || "General"}</p>
              <p><strong>Level:</strong> {course.level || "Beginner"}</p>
              <p><strong>Language:</strong> {course.language || "English"}</p>
              <p><strong>Duration:</strong> {course.duration} Week{course.duration > 1 ? "s" : ""}</p>
              <Link to={`/lectures/${course._id}`} className="btn btn-start-learning">
                Start Learning
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseStudy;
