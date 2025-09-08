import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { FaStar } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  const {fetchCourses}=CourseData()

  const rating = 4.5;
  const students =  1234;

const deleteHandler=async(id)=>{
if(confirm("Really Want to Delete😱😱")){
    try {
    const {data}=await axios.delete(`${server}/api/course/${id}`,{
      headers:{
        token:localStorage.getItem("token"),

      }
    })
    toast.success(data.message)
    fetchCourses()
    
  } catch (error) {
    toast.error(error.response.data.message)
    
  }


}
}


  return (
    <div className="course-card">
      {/* Course Thumbnail */}
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="course-image"
      />

      {/* Course Details */}
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>

        <p className="course-instructor">{course.createdBy}</p>

        {/* Rating + Students */}
        <div className="course-rating">
          <FaStar className="star" />
          <span>{rating.toFixed(1)}</span>
          <span className="students">({students.toLocaleString()})</span>
        </div>

        {/* Price + Button */}
        <div className="course-footer">
          <span className="course-price">
            {course.price === 0 ? "Free" : `₹${course.price}`}
          </span>

          {isAuth ? (
            <>
              {user && user.role !== "admin" ? (
                <>
                  {user.subscriptions.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="btn-24"
                    >
                      <span>View Details</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="btn-24"
                    >
                      <span>View Details</span>
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn-1"
                >
                  View Details
                </button>
              )}
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="btn-24">
              <span>View Details</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Delete Button */}
      {user && user.role === "admin" && (
<div class="wrap-delete"><button onClick={()=>deleteHandler(course._id)} class="button-delete"><span class='text'>Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button></div>      )}
    </div>
  );
};

export default CourseCard;
