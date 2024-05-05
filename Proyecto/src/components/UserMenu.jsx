import React, { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
export const UserMenu = ({ name, email, setUserMenu }) => {
  const { logout } = useContext(authContext)
  return (
    <div className='userMenu'>
      <div className='userMenu_group'>
        <img width={"38px"} src={'../public/pikachu.webp'} alt="Avatar" />
        <h3 className='userMenu_name'> {name}</h3>
      </div>
      <h4 className='userMenu_email'><b>Email:</b> {email}</h4>
      <Link className='userMenu_favoritos' to={"/favoritos"}>Mis Favoritos</Link>
      <Link className='userMenu_favoritos' to={"/editprofile"}>Editar Perfil</Link>
      <button className='btn btn-login' onClick={() => { logout(); setUserMenu(false) }}>Logout</button>
    </div>
  )
}
