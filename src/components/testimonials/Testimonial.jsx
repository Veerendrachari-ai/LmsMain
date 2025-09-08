import React from 'react'
import './testimonial.css'

const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Arjun Sharma",
      position: "Student",
      message:
        "This platform has completely transformed my learning journey. The courses are exceptional and the faculty members are truly knowledgeable experts in their fields.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Student",
      message:
        "The quality of education here is outstanding. The interactive modules and assessments make complex concepts easy to understand and remember.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Rahul Gupta",
      position: "Student",
      message:
        "I'm grateful for this incredible learning experience. The comprehensive curriculum and dedicated mentors have helped me achieve my academic goals efficiently.",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      position: "Student",
      message:
        "This platform offers an unmatched learning environment. The practical approach and real-world applications make studying both engaging and meaningful.",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      id: 5,
      name: "Karan Mehta",
      position: "Engineering Student",
      message:
        "The hands-on projects and coding challenges really helped me apply what I learned. This platform bridges the gap between theory and practice.",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 6,
      name: "Aisha Khan",
      position: "MBA Student",
      message:
        "The mentorship and guidance I received here were outstanding. The personalized feedback made a huge difference in my preparation and confidence.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <p className="subtitle">
        Hear from learners who have grown with our platform 🚀
      </p>

      <div className="testimonials-grid">
        {testimonialsData.map((t) => (
          <div className="testimonial-card" key={t.id}>
            <p className="message">“{t.message}”</p>
            <div className="student-info">
              <img src={t.image} alt={t.name} className="student-image" />
              <div>
                <h4 className="name">{t.name}</h4>
                <p className="position">{t.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonial
