import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Testimonial from '../../components/testimonials/Testimonial'



const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          
          {/* Left Content */}
          <div className="hero-text">
            <h1>Welcome to <span>E-Vidya</span> Platform</h1>
            <p>
              Learn from top instructors, explore interactive courses, and track your progress to
              achieve your learning goals. Education, redefined for the digital age.
            </p>
            <button onClick={() => navigate("/courses")} className="btn-35"><span>
              Get Started</span>
            </button>
          </div>

          {/* Right Image */}
         <div className="hero-image">
  <img 
    src="/intro-girl.png" 
    alt="E-Learning" 
    className='img-girl'
  />
</div>

        </div>
      </section>

      {/* Testimonials */}
      <Testimonial />
    </div>
  )
}

export default Home
