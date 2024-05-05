import React, { useContext, useState } from 'react'
import { authContext } from "../context/AuthContext"
import { Link} from "react-router-dom"
import {useForm} from 'react-hook-form'
export const Login = () => {
  const {login} = useContext(authContext)
  const {register, handleSubmit} = useForm()

  return (
    <div className='container center'>
    <div className="form-container">
      <p className="title">Welcome back</p>
      <form action="POST" onSubmit={handleSubmit((values)=>{
        login(values)
      })} className='form'>
        <div className='form_group'>
        <label htmlFor="username">username:</label>
        <input  type="text" className="input" {...register('username',{required:true})} placeholder="TheBeast123"/>
        </div>
        <div className='form_group'>
        <label htmlFor="password">Password:</label>
        <input  type="password" className="input" {...register('password',{required:true})} placeholder="*******"/>
        </div>
        <button className="form-btn" type='submit'>Log in</button>
        </form>
      <p className="sign-up-label">
        Don't have an account?<Link to={"/register"} className="sign-up-link">Sign up</Link>
      </p>
    </div>
    </div>
  )
}
