import React from 'react'
import './common.css'
import { Link } from 'react-router-dom'
import { FaBook, FaHome, FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
const SideBar = () => {
  return (
    <div className='sidebar'>
        <ul>
            <li>

                <Link to={'/admin/dashboard'}>
                <div className="icon">
                    <FaHome/>
                </div>
                <span>Home</span>
                </Link>
                 <Link to={'/admin/course'}>
                <div className="icon">
                    <FaBook/>

                </div>
                <span>Courses</span>
                </Link>
                 <Link to={'/admin/users'}>
                <div className="icon">
                    <FaUserAlt/>

                </div>
                <span>Users</span>
                </Link>
                 <Link to={'/'}>
                <div className="icon">
                    <AiOutlineLogout/>

                </div>
                <span>Logout</span>
                </Link>

            </li>
        </ul>
      
    </div>
  )

}
export default SideBar
