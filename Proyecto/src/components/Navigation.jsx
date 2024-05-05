import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PokemonContext } from '../context/PokemonContext'
import { authContext } from '../context/AuthContext'
import { UserMenu} from "./index"
import logoApp from "../resources/logoApp.webp"
export const Navigation = () => {
  const {onInputChange, valueSearch, onResetForm} = useContext(PokemonContext)
  const {user} = useContext(authContext) 
  const [userMenu, setUserMenu] = useState(false)
  const navigate = useNavigate()
  const onSearchSubmit = (e)=>{
    e.preventDefault()
      if(valueSearch!=='')(navigate(`/search`,{
      state: valueSearch
    }),onResetForm()) 
  }
  return (
    <>
      <header >
        <div className="container header">
    <Link to={"/"} className="logo">
        <img src={logoApp} alt="Logo Podedex" />
    </Link>
        <form className='form-search' onSubmit={onSearchSubmit}>
            <div className="form-group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon-search">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                className="input-search"
                type="search" 
                placeholder="Ej: Charmander"
                name="valueSearch" 
                value={valueSearch}
                onChange={onInputChange}
                id=""
                />                    
            </div>
            <button className="btn-search btn">Buscar</button>
        </form>
        {
          !user?(
            <div className='container-btnAuth'>
            <button className='btn-login btn' onClick={()=>navigate("/login")}>Login</button>
            <button className='btn-register btn' onClick={()=>navigate("/register")}>register</button>
            </div>
          ):(
            <div className='userAuth'>
              <img width="50" onClick={()=>setUserMenu(!userMenu)} height="50" src={'../public/pikachu.webp'} alt="avatar"/>
              {
            userMenu&&(
              <UserMenu setUserMenu={setUserMenu} name={user.username} email={user.email} />
            )
          }
          </div>
          )
          }
    
          </div>
    </header>
      <Outlet/>
    </>
  )
}
