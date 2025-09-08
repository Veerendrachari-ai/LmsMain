import React from 'react'
import './about.css'

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        {/* Left Side: Content */}
        <div className="about-content">
          <h2>About <span>E-Vidya Platform</span></h2>
          <p className="intro">
            Our Learning Management System (LMS) is designed to make education accessible, 
            engaging, and effective. Whether you’re a student, educator, or professional, 
            our platform empowers you to achieve your learning goals.
          </p>

          <div className="about-details">
            <div className="detail-box">
              <h3>🎯 Our Mission</h3>
              <p>
                To provide affordable, high-quality digital learning experiences that 
                enable learners to upskill and stay ahead in today’s fast-paced world.
              </p>
            </div>

            <div className="detail-box">
              <h3>👩‍🏫 Our Vision</h3>
              <p>
                To create a global community of lifelong learners by bridging the gap 
                between traditional education and modern e-learning.
              </p>
            </div>

            <div className="detail-box">
              <h3>🚀 Why Choose Us?</h3>
              <ul>
                <li>Interactive video lectures & live sessions</li>
                <li>Track progress with personalized dashboards</li>
                <li>Certificates for completed courses</li>
                <li>24/7 mentor and community support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="about-image">
          <img src="/About-page.png" alt="E-learning Illustration" />
        </div>
        <div className="books-img">
          <img src="/books.png" alt="" srcset="" />
        </div>
      </div>
    </section>
  )
}

export default About
