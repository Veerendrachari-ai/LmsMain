import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main.jsx";
import Loading from "../../components/loading/Loading.jsx";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
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

  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
      if (data.lectures.length > 0) fetchLecture(data.lectures[0]._id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  };

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
      setTitle(""); setDescription(""); setVideo(""); setVideoPreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  useEffect(() => { fetchLectures(); }, []);

  if (loading) return <Loading />;

  return (
    <div className="udemy-lecture-page">
      {/* Left panel: Video + lecture details */}
      <div className="lecture-left-panel">
        {lecLoading ? <Loading /> : lecture.video ? (
          <>
            <video
              src={`${server}/${lecture.video}`}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              autoPlay
              className="lecture-video-player"
            ></video>
            <h1 className="lecture-title">{lecture.title}</h1>
            <p className="lecture-description">{lecture.description}</p>
          </>
        ) : (
          <h1 className="lecture-placeholder">Select a Lecture</h1>
        )}
      </div>

      {/* Right panel: Lecture list + admin form */}
      <div className="lecture-right-panel">
        {user?.role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-toggle-form"
          >
            {showForm ? "Close Form" : "Add Lecture"}
          </button>
        )}

        {showForm && (
          <div className="lecture-form-card">
            <h2>Add Lecture</h2>
            <form onSubmit={submitHandler}>
              <label>Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

              <label>Description</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />

              <label>Upload Video</label>
              <input type="file" onChange={changeVideoHandler} required />
              {videoPreview && <video src={videoPreview} controls className="video-preview"></video>}

              <button type="submit" className="btn-submit" disabled={btnLoading}>
                {btnLoading ? "Uploading..." : "Add Lecture"}
              </button>
            </form>
          </div>
        )}

        <div className="lecture-list-card">
          {lectures.length > 0 ? lectures.map((lec, i) => (
            <div key={lec._id} className={`lecture-list-item ${lecture._id === lec._id ? "active" : ""}`}>
              <span onClick={() => fetchLecture(lec._id)}>{i + 1}. {lec.title}</span>
              {user?.role === "admin" && (
                <button onClick={() => deleteHandler(lec._id)} className="btn-delete">Delete</button>
              )}
            </div>
          )) : <p>No lectures found</p>}
        </div>
      </div>
    </div>
  );
};

export default Lecture;
