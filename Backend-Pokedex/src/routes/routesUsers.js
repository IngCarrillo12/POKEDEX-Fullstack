import { Router } from "express";
import {createUser} from '../controllers/controllersUsers.js'
const routeUsers = Router();

// routeUsers.get('/:id', favoritesById )
routeUsers.post('/register', createUser )

export default routeUsers