import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="lms-login-wrapper">
      {/* Left side - Quote */}
      <div className="login-quote-side">
        <div className="quote-content">
          <h1>Empower Your Learning Journey</h1>
          <p>""Your future begins here — register and start learning."</p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="login-form-side">
        <div className="login-card">
          <h2>Register</h2>
          <p className="subtitle">Create your account</p>
          <form onSubmit={submitHandler} className="login-form">
            <div className="form-field">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z]*$/.test(value)) {
                    setName(value);
                  }
                }}
                required
                placeholder=" "
              />

              <label>Full Name</label>
              <span className="focus-border"></span>
            </div>
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
              {btnLoading ? "Please Wait" : "Register"}
            </button>
          </form>
          <div className="login-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
