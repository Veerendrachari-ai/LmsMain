import React from "react";
import "./courseCard.css";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();
  const navigate = useNavigate();

  const rating = 4.8;
  const  students =0;

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    try {
      const { data } = await axios.delete(`${server}/api/course/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting course");
    }
  };

  const handleView = () => {
    if (!isAuth) return navigate("/login");
    if (user?.role === "admin") return navigate(`/course/study/${course._id}`);
    if (user?.subscriptions.includes(course._id))
      return navigate(`/course/study/${course._id}`);
    navigate(`/course/${course._id}`);
  };

  return (
    <div className="pro-course-card">
      <div className="card-thumb">
        <img src={`${server}/${course.image}`} alt={course.title} />
        {user?.role === "admin" && (
          <button className="delete-floating" onClick={() => deleteHandler(course._id)}>
            <span>✖</span>
          </button>
        )}
      </div>

      <div className="card-body">
        <h3 className="title">{course.title}</h3>
        <p className="instructor">By {course.createdBy}</p>

        <div className="rating-row">
          <FaStar className="star" />
          <span>{rating}</span>
          <span className="students">({students.toLocaleString()})</span>
        </div>

        <div className="bottom-row">
          <p className="price">
            {course.price === 0 ? "Free" : `₹${course.price}`}
          </p>
          <button onClick={handleView} className="btn-modern">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
