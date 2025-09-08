import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext.jsx'
import { CourseData } from '../../context/CourseContext.jsx'

const Login = () => {
  const naviate=useNavigate()

  const {btnLoading,loginUser}=UserData()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {fetchMyCourse}=CourseData()

  const submitHandler=async(e)=>{
    // prevents loading
    e.preventDefault()

    await loginUser(email,password,naviate,fetchMyCourse)


  }


  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor='email' >Email</label>
                <input type='email' value={email} onChange={(e)=>{
                  setEmail(e.target.value) }} required></input>
                <label htmlFor='password'>Password</label>
                <input type='password' value={password} onChange={(e)=>{
                  setPassword(e.target.value) }} required></input>
                <button type='submit' disabled={btnLoading} className='common-btn-login'>{btnLoading?"please Wait":"Login"}</button>
            </form>
            <p>
                Don't Have Account<Link to="/register">Register</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
