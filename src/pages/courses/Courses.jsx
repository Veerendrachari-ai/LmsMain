import React from 'react'
import './courses.css'
import { CourseData } from '../../context/CourseContext.jsx'
import CourseCard from '../../components/coursecard/CourseCard.jsx'

const Courses = () => {

    const {courses}=CourseData()
    console.log(courses)

  return (
    <div className="courses">
        <h2>Avaliable Courses</h2>
        <div className="course-container">
          {

            courses && courses.length>0 ?courses.map((e)=>(
              <CourseCard key={e.id} course={e}/>
            )) :<p>We Will Get You Later...</p>
          }
            
        </div>
    </div>
   
  )
}

export default Courses
