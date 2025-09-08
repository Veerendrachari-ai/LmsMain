import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext'

const Register = () => {
  const naviate=useNavigate()

  const {btnLoading,registerUser}=UserData()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const submitHandler=async(e)=>{
    // prevents loading
    e.preventDefault()

    await registerUser(name,email,password,naviate)


  }
  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={submitHandler} >
                 <label htmlFor='name' >Full Name</label>
                <input type='text'value={name} onChange={(e)=>{
                  setName(e.target.value) }} required></input>
                <label htmlFor='email'>Email</label>
                <input type='email' value={email} onChange={(e)=>{
                  setEmail(e.target.value) }}  required></input>
                <label htmlFor='password'>Password</label>
                <input type='password' value={password} onChange={(e)=>{
                  setPassword(e.target.value) }}  required></input>
                <button type='submit' disabled={btnLoading} className='common-btn-login'>{btnLoading?"Please Wait":"Register"}</button>
            </form>
            <p>
                Already Have Account<Link to="/login">Login</Link>
            </p>
        </div>
    </div>
  )
}

export default Register
