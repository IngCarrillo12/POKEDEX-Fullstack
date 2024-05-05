import React, { useContext } from "react";
import {Navigate, Route, Routes } from "react-router-dom";
import {Navigation} from './components/Navigation'
import { Login } from "./components/Login";
import { Register } from "./components/Register"
import { HomePage, SearchPage, PokemonPage } from "./pages";
import { FavoritosPage } from "./pages/FavoritosPage";
import { authContext } from "./context/AuthContext";
import { EditProfile } from "./components";

export const AppRouter = ()=>{
    const { user } = useContext(authContext)
    return <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />}/>
            <Route path="/pokemon/:id" element={<PokemonPage />} />
            <Route path ='/search' element={<SearchPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route
          path="/favoritos"
          element={user ? <FavoritosPage /> : <Navigate to="/login" />}
        />
         <Route
          path="/editprofile"
          element={user ? <EditProfile /> : <Navigate to="/login" />}
        />
        </Route>
        <Route path="*" element={<Navigate to ='/'/>} />
    </Routes>
}