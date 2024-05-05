
import { db } from "../db.js";

export const favoritesById = async(req,res)=>{
   try {
    const {id} = req.params
    const [response] = await db.query('SELECT idpokemon FROM favoritepokemons WHERE idusers= ?', [id])
    if(response.length===0)return res.status(400).send({message: 'No hay pokemones favoritos'})
      console.log(response)
    res.status(200).send(response)
   } catch (error) {
    console.log(error)
    res.status(500).send({message:error})
   }

}

export const addFavorites = async(req,res)=>{
   try {
      const {idusers, idpokemon} = req.body
      const [response] = await db.query('INSERT INTO favoritepokemons (idusers, idpokemon) VALUES (?, ?)', [idusers, idpokemon])
   if(response.affectedRows === 0)return res.status(400).send({message:'Error al agregar a favoritos'})
      res.status(200).send({message:'Agregado Correctamente'})
   } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
   }
}