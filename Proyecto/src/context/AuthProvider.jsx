
import { useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const urlApi = 'http://localhost:3001'
  const navigate = useNavigate()

const signUp = async (values) => {
    try {
      const {username, email, birthday, password} = values
      const {data} = await axios.post(`${urlApi}/users/register`,{username, email, birthday, password},{withCredentials:true})
      console.log(data)
      setUser(data)
      navigate('/')
    } catch ({response}) {
      Swal.fire({
        title: 'Error',
        text: response.data.message,
        icon: "error"
      })
    }
};
const getFavorites = async()=>{
   try {
      const {data} = await axios.get(`${urlApi}/favorites/${user.idusers}`,{withCredentials: true})
      return [...data]
   } catch ({response}) {
      console.log(response.data.message)
   }
}
const toggleFavoritos= async(idpokemon, idusers)=>{
  try {
    const iduser = Number(idusers)
    const pokemonid = Number(idpokemon)
    const {data} = await axios.post(`${urlApi}/favorites`,{idusers:iduser, idpokemon:pokemonid},{withCredentials: true})
    return true
 } catch ({response}) {
    console.log(response.data.message)
 }
}
const login = async(values) => {
  try {
    const {username, password} = values
    const {data} = await axios.post(`${urlApi}/users/login`,{username, password},{withCredentials:true})
    setUser(data)
    navigate('/')
  } catch ({response}) {
    Swal.fire({
      title: 'Error',
      text: response.data.message,
      icon: "error"
    })
  }
};

const logout = async()=>{
  const {data} = await axios.post(`${urlApi}/users/logout`,{withCredentials:true})
  if(data)setUser(null)
}
const editProfile = async(values)=>{
    try {
      console.log(username, password, birthday, email)
      const {username, password, birthday, email} = values
      const {data}= await axios.put(`${urlApi}/users/profile`,{username, password, birthday, email, iduser: user.idusers}, {withCredentials:true}) 
      console.log(data.message)   
    } catch (error) {
      console.log(error)
    }
}


  return (
    <authContext.Provider value={{ signUp, login, user, getFavorites, toggleFavoritos, logout, editProfile}}>
      {children}
    </authContext.Provider>
  );
};