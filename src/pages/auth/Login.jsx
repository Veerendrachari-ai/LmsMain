import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext.jsx'
import { CourseData } from '../../context/CourseContext.jsx'

const Login = () => {
  const navigate = useNavigate()
  const { btnLoading, loginUser } = UserData()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { fetchMyCourse } = CourseData()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loginUser(email, password, navigate, fetchMyCourse)
  }

  return (
    <div className="lms-login-wrapper">
      {/* Left side - Quote */}
      <div className="login-quote-side">
        <div className="quote-content">
          <h1>Empower Your Learning Journey</h1>
          <p>"Every login is a step closer to your goals."</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="login-form-side">
        <div className="login-card">
          <h2>Sign In</h2>
          <p className="subtitle">Enter your credentials</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder=" " 
              />
              <label>Email</label>
              <span className="focus-border"></span>
            </div>
            <div className="form-field">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder=" " 
              />
              <label>Password</label>
              <span className="focus-border"></span>
            </div>
            <button type="submit" className="btn-submit" disabled={btnLoading}>
              {btnLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
