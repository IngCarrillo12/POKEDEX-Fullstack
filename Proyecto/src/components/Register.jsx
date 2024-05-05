import React, { useContext } from 'react'
import { authContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
export const Register = () => {
  const {signUp} = useContext(authContext)
  const {register, handleSubmit} = useForm()

  return (
    <>
   <div className='container center'>
    <div className="form-container">
      <p className="title">Sign Up</p>
      <form action="" onSubmit={handleSubmit((values)=>{
        signUp(values)
      })} className='form'>
      <div className='form_group'>
        <label htmlFor="username">Username:</label>
        <input  type="text" className="input" {...register('username',{required:true})} placeholder="TheBeast123"/>
        </div>
        <div className='form_group'>
        <label htmlFor="email">Email:</label>
        <input  type="email" className="input" {...register('email',{required:true})} placeholder="YourEmail@company.com"/>
        </div>
        <div className='form_group'>
        <label htmlFor="birthday">Birthday:</label>
        <input  type="date" className="input" {...register('birthday',{required:true})}/>
        </div>
        <div className='form_group'>
        <label htmlFor="password">Password:</label>
        <input type="password" className="input" {...register('password',{required:true})} placeholder="*******"/>
        </div>
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
