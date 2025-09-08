import React from 'react'
import './account.css'
import { MdDashboard } from 'react-icons/md'
import { PiStudentFill } from "react-icons/pi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaBookOpen, FaCheckCircle, FaCertificate } from 'react-icons/fa'
import { LogOut } from 'lucide-react';
import { UserContextProvider, UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { RiLogoutCircleRFill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Navigate, useNavigate } from 'react-router-dom';

const Account = ({user}) => {
  const {setIsAuth,setUser}=UserData()
  const navigate=useNavigate()

  const LogOutHandler=()=>{
    localStorage.clear()
    setUser([])
    setIsAuth(false)
    toast.success(`😭 Leaving already, ${user.name}? You’re breaking my heart💔`)
  }


  return (
    <div className="account">
     {user &&  <div className="profile-card">
        <div className="profile-header">
          <img
            src="/image.png"
            alt="User Avatar"
            className="profile-avatar"
          />
          <div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <span className="profile-role"><PiStudentFill /></span>
            <button onClick={LogOutHandler} className='profile-role'><span className="commont-btn">LogOut</span>
</button>
          </div>
        </div>

        <div className="profile-stats">
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
            <BiSolidPurchaseTag className="stat-icon"  />
            <h3>{user.subscriptions?.length || 0}</h3>
            <p>Purchased</p>
          </div>
          
        </div>

        <div className="profile-actions">
      <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="btn-15">
 
    <span className="text"><TbLayoutDashboardFilled />DashBoard</span>
 
</button>
<br/>
{
  user.role ==="admin" &&(
     <button onClick={()=>navigate(`/admin/dashboard`)} className="btn-15">
 
    <span className="text">Admin DashBoard</span>
 
</button>
  )
}
<br/>

        </div>
      </div>}
    </div>
  )
}

export default Account
