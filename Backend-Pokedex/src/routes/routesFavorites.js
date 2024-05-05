import { Router } from "express";
import { favoritesById, toogleFavorites } from "../controllers/controllersFavorites.js";

const routesFavorites = Router();

routesFavorites.get('/:id', favoritesById)

routesFavorites.post('/', toogleFavorites)
export default routesFavorites