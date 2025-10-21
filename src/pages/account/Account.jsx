import React from 'react';
import './account.css';
import { PiStudentFill } from "react-icons/pi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa';
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success(`😭 Leaving already, ${user.name}? You’re breaking my heart💔`);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="udemy-account-page">
      {/* Profile Header */}
      <div className="profile-banner">
        <div className="profile-avatar-container">
          <img src="/image.png" alt="User Avatar" className="profile-avatar" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <div className="profile-role">
            <PiStudentFill /> {user.role || "Student"}
          </div>
        </div>
        <button className="btn-logout" onClick={logOutHandler}>
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="profile-stats-container">
        <div className="stat-box">
          <FaBookOpen className="stat-icon" />
          <h3>{user.subscriptions?.length || 0}</h3>
          <p>Enrolled Courses</p>
        </div>
        <div className="stat-box">
          <FaCheckCircle className="stat-icon" />
          <h3>{user.subscriptions?.length || 0}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-box">
          <BiSolidPurchaseTag className="stat-icon" />
          <h3>{user.subscriptions?.length || 0}</h3>
          <p>Purchased</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="profile-actions">
        <button className="btn-action" onClick={() => navigate(`/${user._id}/dashboard`)}>
          <TbLayoutDashboardFilled /> Dashboard
        </button>

        {user.role === "admin" && (
          <button className="btn-action" onClick={() => navigate(`/admin/dashboard`)}>
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
