import React, { useEffect, useState } from "react";
import "./coursedesc.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id, fetchCourse]);

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const { data } = await axios.post(
        `${server}/api/course/${params.id}/checkout`,
        {},
        { headers: { token } }
      );

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Unable to start payment");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!course) return <div className="loading">Loading Course...</div>;

  return (
    <div className="course-page-modern">
      <div className="course-card-modern">
        <div className="course-top-modern">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="course-image-modern"
          />
          <div className="course-info-modern">
            <h1 className="course-title-modern">{course.title}</h1>
            <p className="course-instructor-modern">By {course.createdBy}</p>
            <div className="course-badges-modern">
              <span className="badge-modern duration">
                {course.duration} Week{course.duration > 1 ? "s" : ""}
              </span>
              {course.level && (
                <span className="badge-modern level">{course.level}</span>
              )}
            </div>
            <p className="course-description-modern">{course.description}</p>

            <div className="course-enroll-section">
              <p className="course-price-modern">
                ₹<span>{course.price}</span>
              </p>
              {user && user.subscriptions.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="btn-modern"
                >
                  Go to Course
                </button>
              ) : (
                <button onClick={checkoutHandler} className="btn-modern">
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Course Syllabus Preview */}
        {course.lectures?.length > 0 && (
          <div className="course-syllabus-modern">
            <h2>Course Content</h2>
            {course.lectures.slice(0, 5).map((lec, idx) => (
              <div key={idx} className="lecture-preview-modern">
                <span>{idx + 1}.</span> {lec.title}
                <div className="progress-bar-modern">
                  <div
                    className="progress-modern"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            ))}
            {course.lectures.length > 5 && (
              <p>+ {course.lectures.length - 5} more lectures</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDescription;
