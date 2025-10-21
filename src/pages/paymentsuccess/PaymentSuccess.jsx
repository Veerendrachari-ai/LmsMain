import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import './paymentSuccess.css';


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { fetchUser } = UserData();

  // extra UI states
  const [status, setStatus] = useState(null); // 'success' | 'failed' | null
  const [serverMessage, setServerMessage] = useState("");
  const [sessionIdState, setSessionIdState] = useState("");
  const [courseIdState, setCourseIdState] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const session_id = searchParams.get("session_id");
        const courseId = searchParams.get("courseId");

        setSessionIdState(session_id || "");
        setCourseIdState(courseId || "");

        if (!session_id || !courseId) {
          setStatus("failed");
          setServerMessage("Invalid payment redirect URL");
          toast.error("Invalid payment redirect URL");
          setLoading(false);
          return;
        }

        const { data } = await axios.post(
          `${server}/api/course/payment-verification`,
          { session_id, courseId },
          { headers: { token } }
        );

        if (data.message === "Payment verified successfully") {
          setStatus("success");
          setServerMessage("Payment Successful! Course unlocked.");
          toast.success("Payment Successful! Course unlocked.");
          await fetchUser();
          // small delay so user sees the success card briefly (optional)
          setTimeout(() => {
            navigate(`/course/study/${courseId}`);
          }, 1200);
        } else {
          setStatus("failed");
          setServerMessage(data.message || "Payment verification failed");
          toast.error(data.message || "Payment verification failed");
        }
      } catch (err) {
        setStatus("failed");
        setServerMessage(err.response?.data?.message || "Payment verification failed");
        toast.error(err.response?.data?.message || "Payment verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <div className="ps-container">
          <div className={`ps-card ${status === "success" ? "ps-success" : "ps-failed"}`}>
            <div className="ps-icon" aria-hidden>
              {status === "success" ? "✓" : "✕"}
            </div>

            <h2 className="ps-title">
              {status === "success" ? "Payment Verified" : "Payment Failed"}
            </h2>

            <p className="ps-message">{serverMessage}</p>

            <div className="ps-meta">
              <div className="ps-meta-row">
                <span className="ps-meta-label">Session ID</span>
                <code className="ps-meta-value">{sessionIdState || "—"}</code>
              </div>
              <div className="ps-meta-row">
                <span className="ps-meta-label">Course ID</span>
                <code className="ps-meta-value">{courseIdState || "—"}</code>
              </div>
            </div>

            <div className="ps-actions">
              {status === "success" ? (
                <>
                  <button
                    className="ps-btn ps-btn-primary"
                    onClick={() => navigate(`/course/study/${courseIdState}`)}
                  >
                    Go to Course
                  </button>
                  <button className="ps-btn" onClick={() => navigate("/")}>
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button className="ps-btn" onClick={() => navigate(-1)}>
                    Try Again
                  </button>
                  <button className="ps-btn" onClick={() => navigate("/")}>
                    Home
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="ps-decor" aria-hidden />
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
