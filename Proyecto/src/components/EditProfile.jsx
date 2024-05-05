import React, { useContext } from 'react'
import { authContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'

export const EditProfile = () => {
    const {editProfile, user} = useContext(authContext)
    const formatDate = (dateString) => {
        if (!dateString) return ''; // Retorna cadena vacía si no hay fecha
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura el formato MM
        const day = date.getDate().toString().padStart(2, '0'); // Asegura el formato DD
        return `${year}-${month}-${day}`;
    };
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: user.username,  
            email: user.email, 
            birthday: formatDate(user.birthday),  
            password: "*******"  
        }
    })
  
    return (
      <>
     <div className='container center'>
      <div className="form-container">
        <p className="title">Editar Perfil</p>
        <form action="" onSubmit={handleSubmit((values)=>{
          editProfile(values)
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
          <button className="form-btn" type='submit'>Guardar Cambios</button>
          </form>

        </div>
        </div>
      </>
    )
}
