import { Router } from "express";
import {logout, signIn, createUser} from '../controllers/controllersUsers.js'
import { authRequired } from "../middlewares/validateToken.js";
const routeUsers = Router();

routeUsers.post('/register', createUser )
routeUsers.post('/login', signIn) 
routeUsers.post('/logout', logout)
routeUsers.post('/profile', authRequired)
export default routeUsers