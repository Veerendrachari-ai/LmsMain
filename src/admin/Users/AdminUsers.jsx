import React, { useEffect, useState } from 'react'
import './adminuser.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {server} from '../../main'
import Layout from '../Utils/Layout'
import toast from 'react-hot-toast'

const AdminUsers = ({user}) => {
  const navigate=useNavigate()

  if(user && user.role !== "admin") return navigate("/");


  const [users,setUsers]=useState([])
  async function fetchUsers(){
    try {
      const {data}=await axios.get(`${server}/api/users`,{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      setUsers(data.users)
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    fetchUsers()
  },[])


  const updateRole=async(id)=>{
    if(confirm("Are you Update Role ?...")){
      try {
        const {data}=await axios.put(`${server}/api/user/${id}`,{},{
          headers:{
            token:localStorage.getItem("token")
          }
        })

        toast.success(data.message)
        fetchUsers()

        
      } catch (error) {
        toast.error(error.response.data.message)
        
      }
    }
  }

  console.log(users)

  return (
   <Layout>
      <div className="users-container">
        <h1>All Users</h1>
       <div className="users-grid">
  {users && users.map((user, index) => (
    <div key={user._id} className="user-card">
      <div className="user-info">
        <div className="user-avatar">{user.name[0].toUpperCase()}</div>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
      <button className="update-btn" onClick={() => updateRole(user._id)}>Update Role</button>
    </div>
  ))}
</div>

      </div>
    </Layout>
  )
}

export default AdminUsers
