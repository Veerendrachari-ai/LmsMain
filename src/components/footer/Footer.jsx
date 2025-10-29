import React from 'react'
import './footer.css'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-about">
          <h3>JnanaDeepa Platform</h3>
          <p>
            Empowering students with quality education, interactive learning, and expert mentorship.
            Join us to unlock your potential and achieve your academic goals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/account">Account</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2K25 JnanaDeepa Platform | All Rights Reserved</p>
        <p>Made with ❤️ by <a href="#">Veerendrachari</a></p>
      </div>
    </footer>
  )
}

export default Footer
