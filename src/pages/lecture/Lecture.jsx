import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main.jsx";
import Loading from "../../components/loading/Loading.jsx";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscriptions.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching lectures", error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log("Error fetching lecture", error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShowForm(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPreview("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-container">
          <div className="lecture-left">
            {lecLoading ? (
              <Loading />
            ) : lecture.video ? (
              <>
                <video
                  src={`${server}/${lecture.video}`}
                  width="100%"
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay
                ></video>
                <h1 className="lecture-title">{lecture.title}</h1>
                <h3 className="lecture-desc">{lecture.description}</h3>
              </>
            ) : (
              <h1 className="lecture-placeholder">Please Select a Lecture</h1>
            )}
          </div>

          <div className="lecture-right">
            {user && user.role === "admin" && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-toggle-form"
              >
                {showForm ? "Close" : "Add Lecture"}
              </button>
            )}

            {showForm && (
              <div className="lecture-form-container">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler} className="lecture-form">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <label>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <input
                    type="file"
                    placeholder="Choose Video Lecture"
                    onChange={changeVideoHandler}
                    required
                  />

                  {videoPreview && (
                    <video
                      src={videoPreview}
                      width={300}
                      controls
                      className="video-preview"
                    ></video>
                  )}

                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="btn-submit-lecture"
                  >
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            {lectures && lectures.length > 0 ? (
              lectures.map((lec, i) => (
                <div key={i} className="lecture-item-wrapper">
                  <div
                    onClick={() => fetchLecture(lec._id)}
                    className={`lecture-item ${
                      lecture._id === lec._id ? "lecture-item-active" : ""
                    }`}
                  >
                    {i + 1}. {lec.title}
                  </div>

                  {user && user.role === "admin" && (
                    <button
                      onClick={() => deleteHandler(lec._id)}
                      className="btn-delete-lecture"
                      style={{ background: "red" }}
                    >
                      Delete {lec.title}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="no-lectures">No Lectures Found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
