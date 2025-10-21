import Layout from '../Utils/Layout'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {server} from '../../main';
import './dashboard.css'
import { FaGraduationCap, FaLaptopCode, FaUsers } from 'react-icons/fa';

const AdminDashBoard = ({user}) => {
    const navigate=useNavigate()
    if(user && user.role!=="admin")return navigate("/")
    const [stats,setStats]=useState("")
async function fetchStats() {
    try {
        const {data}=await axios.get(`${server}/api/stats`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setStats(data.stats)
        console.log(data.stats)
    } catch (error) {
        console.log("Admin Dashboard loo error ochindhi...",error)
        
    }
    
}

// fetching....roooo
useEffect(()=>{
    fetchStats()
},[])
  return (
    <div>
   
            <Layout>
   <div className="main-content">
  {/* Circle for Total Courses */}
  <div 
    className="stat-meter cour" 
  >
    <div className="icon"><FaGraduationCap /></div>
    <div className="inner">
      <span>{stats.totalCourses || 0}</span>
      <p>Total Courses</p>
    </div>
  </div>

  {/* Circle for Total Lectures */}
  <div 
    className="stat-meter lec" 
  >
    <div className="icon"><FaLaptopCode /></div>
    <div className="inner">
      <span>{stats.totalLectures || 0}</span>
      <p>Total Lectures</p>
    </div>
  </div>

  {/* Circle for Total Users */}
  <div 
    className="stat-meter usr" 
  >
    <div className="icon"><FaUsers /></div>
    <div className="inner">
      <span>{stats.totalUser || 0}</span>
      <p>Total Users</p>
    </div>
  </div>
</div>

    </Layout>
       
      
    </div>
  )
}

export default AdminDashBoard