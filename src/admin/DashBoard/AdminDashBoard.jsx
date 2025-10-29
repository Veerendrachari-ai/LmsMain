import Layout from '../Utils/Layout'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main';
import './dashboard.css'
import { FaGraduationCap, FaLaptopCode, FaUsers } from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const AdminDashBoard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [lineData, setLineData] = useState([]);

  if (user && user.role !== "admin") return navigate("/");

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") }
      });
      setStats(data.stats);
      generateChartData(data.stats);
    } catch (error) {
      console.log("Admin Dashboard error...", error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  // Generate progressive 6-month chart from totals
  const generateChartData = (stats) => {
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']; // last 6 months
    const totalCourses = stats.totalCourses || 0;
    const totalUsers = stats.totalUser || 0;
    const totalLectures = stats.totalLectures || 0;

    // Divide totals evenly across 6 months for trend
    const courseStep = totalCourses / months.length;
    const userStep = totalUsers / months.length;
    const lectureStep = totalLectures / months.length;

    let courses = 0, users = 0, lectures = 0;

    const data = months.map((month) => {
      courses += courseStep;
      users += userStep;
      lectures += lectureStep;

      return {
        name: month,
        courses: Math.round(courses),
        users: Math.round(users),
        lectures: Math.round(lectures),
      };
    });

    setLineData(data);
  };

  return (
    <Layout>
      <div className="main-content">
        {/* Total Courses */}
        <div className="stat-meter cour">
          <div className="icon"><FaGraduationCap /></div>
          <div className="inner">
            <span>{stats.totalCourses || 0}</span>
            <p>Total Courses</p>
          </div>
        </div>

        {/* Total Lectures */}
        <div className="stat-meter lec">
          <div className="icon"><FaLaptopCode /></div>
          <div className="inner">
            <span>♾️</span>
            <p>Total Lectures</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="stat-meter usr">
          <div className="icon"><FaUsers /></div>
          <div className="inner">
            <span>{stats.totalUser || 0}</span>
            <p>Total Users</p>
          </div>
        </div>
      </div>

      {/* Line Graph */}
      <div className="graph-container">
        <h3>6-Month Growth: Courses, Lectures & Users</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="courses" stroke="#0ea5e9" strokeWidth={3} />
            <Line type="monotone" dataKey="lectures" stroke="#22c55e" strokeWidth={3} />
            <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

export default AdminDashBoard;
