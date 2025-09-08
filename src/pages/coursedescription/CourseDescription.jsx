import React, { useEffect, useState } from "react";
import "./coursedesc.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
    
  }, []);

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
        // Redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error("Unable to start payment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
      setLoading(false);
    }
  };



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description-1">
              <div className="course-header-1">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="course-image-1"
                />
                <div className="course-info-1">
                  <h2>{course.title}</h2>
                  <p className="createdby">Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>
              <div className="descript-1">

              <p>{course.description}</p>
              </div>

<p className="price">
  Let's get started with course at ₹{" "}
  <span style={{ color: "red" }}>{course.price}</span>
</p>

              {user && user.subscriptions.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="btn-97"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn-1">
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;