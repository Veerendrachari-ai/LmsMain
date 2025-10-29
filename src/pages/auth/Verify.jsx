import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext';

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate)
  }

  return (
    <div className="lms-login-wrapper">
      {/* Left side - Quote */}
      <div className="login-quote-side">
        <div className="quote-content">
          <h1>Secure Your Account</h1>
          <p>"Secure your account — every step matters in your learning journey."</p>
        </div>
      </div>

      {/* Right side - OTP Verify Form */}
      <div className="login-form-side">
        <div className="login-card">
          <h2>Verify Account</h2>
          <p className="subtitle">Enter your OTP</p>
          <form onSubmit={submitHandler} className="login-form">
            <div className="form-field">
              <input 
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder=" "
              />
              <label>OTP</label>
              <span className="focus-border"></span>
            </div>
            <button type="submit" className="btn-submit" disabled={btnLoading}>
              {btnLoading ? "Please wait..." : "Verify"}
            </button>
          </form>
          <div className="login-footer">
            <p>Go to <Link to='/login'>Login</Link> Page</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
