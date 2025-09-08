import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'


const Header = ({isAuth,user}) => {
    const messages = [
    `👋 Welcome aboard, ${user?.name || "Guest"} 🎉`,
    `🌟 Hey ${user?.name || "Guest"}, great to see you back 🚀`,
    `📚 Ready to learn today, ${user?.name || "Guest"}? ✨`,
    `🔥 Keep growing, ${user?.name || "Guest"} 💡`,
    `😎 Glad you’re here, ${user?.name || "Guest"}! Let’s do this 💪`,
    `🌈 Hello ${user?.name || "Guest"}, your learning journey awaits! 📖`,
    `🎯 Focus time, ${user?.name || "Guest"} – you got this ✅`,
    `🚀 Let’s make progress, ${user?.name || "Guest"}!`,
    `✨ Shine bright, ${user?.name || "Guest"} – knowledge is power 🌟`,
    `🌻 Welcome back, ${user?.name || "Guest"}! Keep blooming 🌸`
  ];
const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  return (
    
<header>
    <div className="logo">E-Vidya</div>
    <div className="link">
              
        {isAuth && <p className="welcome-msg">{randomMsg}</p>}
        <Link to={'/'}>Home</Link>
        <Link to={'/courses'}>Courses</Link>
        <Link to={'/about'}>About</Link>
        {
          isAuth?(
              <Link to={'/account'}>Account</Link>
          ):(
            <Link to={"/login"}>Login</Link>
          )
        }
    </div>
</header>
  )
}

export default Header
