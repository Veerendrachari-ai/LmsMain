import React, { useEffect } from "react";
import "./coursestudy.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();

  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscriptions.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={`${server}/${course.image}`} alt="" srcset="" width={350} />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <div className="course-info-box">
            <h3>Course Info</h3>
            <h5>
              Instructure - <span>{course.createdBy}</span>
            </h5>
            <h5>
              Duration- <span>{course.duration} Week's</span>
            </h5>
          </div>
          <Link to={`/lectures/${course._id}`}>
            <h2>Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
