import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Testimonial from '../../components/testimonials/Testimonial';

const Home = () => {
  const navigate = useNavigate();

  // Example featured categories
  const categories = [
    { title: "Web Development", image: "/web-dev.png" },
    { title: "Data Science", image: "/data-science.png" },
    { title: "Design", image: "/design.png" },
    { title: "Business", image: "/business.png" },
  ];

  return (
    <div className="udemy-home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className='flame'>Learn Anything, Anytime on <span><img src="/about.png" alt="" srcset=""  className='home'/></span></h1>
            <p>
              Access top instructors, interactive courses, and track your progress 
              to achieve your learning goals. Education redefined for the digital age.
            </p>
            <button onClick={() => navigate("/courses")} className="btn-cta">
              Get Started
            </button>
          </div>
          <div className="hero-right">
            <img src="/intro-girl.png" alt="E-Learning" className="hero-image"/>
          </div>
        </div>
      </section>
{/* Testimonials */}
      <section className="home-testimonials">
        <Testimonial />
      </section>
    </div>
  );
};

export default Home;
