import React from 'react'
import './dashboard.css'
import {CourseData} from "../../context/CourseContext.jsx"
import CourseCard from '../../components/coursecard/CourseCard.jsx'

const Dashboard = ({user}) => {
    const {mycourse}=CourseData()
    
  return (
    <div className='welcome-1'>
        <div className="welcome-banner">
<h1>Welcome back, {user.name}</h1>
  <p>"The beautiful thing about learning is that no one can take it away from you." - Team vidya@pvtLMTD</p>
</div>


        <div className="student-Dashboard">
            <h2>All Enrolled Courses</h2>
            <div className="dashboard-content">
                {
                    mycourse &&  mycourse.length >0 ?mycourse.map((e)=>(
                        <CourseCard key={e._id} course={e}/>
                    )) :<p>No Courses Enrolled Yet😔</p>
                }
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard
