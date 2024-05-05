import React, { useContext, useState } from 'react'
import { authContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
export const Register = () => {
  const {signUp, error} = useContext(authContext)
  const [user, setUser] = useState({nickName: "",email:"", password:"", photoURL:""})
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name, value} = e.target
    setUser({
      ...user,
      [name]:value,
      photoURL:'/jovencito.webp'
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const resultSignUp = await signUp(user.email, user.password, user.nickName, user.photoURL)
    if(resultSignUp)navigate("/")  
  }
  return (
    <>
   <div className='container center'>
    <div className="form-container">
      <p className="title">Sign Up</p>
      <form action="" onSubmit={handleSubmit} className='form'>
      <div className='form_group'>
        <label htmlFor="nickName">NickName:</label>
        <input onChange={handleChange} type="text" name='nickName' className="input" placeholder="TheBeast123" required/>
        </div>
        <div className='form_group'>
        <label htmlFor="email">Email:</label>
        <input onChange={handleChange} type="email" name='email' className="input" placeholder="YourEmail@company.com"/>
        </div>
        <div className='form_group'>
        <label htmlFor="password">Password:</label>
        <input onChange={handleChange} type="password" name='password' className="input" placeholder="*******"/>
        </div>
        {
          error&& <span>{error}</span>
        }
        
        <button className="form-btn" type='submit'>Sign Up</button>
        </form>
      <p className="sign-up-label">
      Do you already have an account?<Link to={"/login"} className="sign-up-link">Log In</Link>
      </p>
      </div>
      </div>
    </>
  )
}
