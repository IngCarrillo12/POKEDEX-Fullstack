
import { db } from "../db.js";

export const favoritesById = async(req,res)=>{
   try {
    const {id} = req.params
    const [response] = await db.query('SELECT idpokemon FROM favoritepokemons WHERE idusers= ?', [id])
    if(response.length===0)return res.status(400).send({message: 'No hay pokemones favoritos'})
    res.status(200).send(response)
   } catch (error) {
    console.log(error)
    res.status(500).send({message:error})
   }

}

export const toogleFavorites = async(req,res)=>{
   try {
      const {idusers, idpokemon} = req.body
      const [data] = await db.query('SELECT idpokemon FROM favoritepokemons WHERE idpokemon = ? AND idusers = ?', [idpokemon, idusers])
      if(data.length === 0){
         const [response] = await db.query('INSERT INTO favoritepokemons (idusers, idpokemon) VALUES (?, ?)', [idusers, idpokemon])
         if(response.affectedRows === 0)return res.status(400).send({message:'Error al agregar a favoritos'})
            res.status(200).send({message:'Agregado Correctamente'})
      }else{
         const [response] = await db.query('DELETE FROM favoritepokemons WHERE idpokemon = ? AND idusers = ?', [idpokemon, idusers]) 
         if(response.affectedRows === 0) return res.status(404).send({message: 'Error al eliminar de favoritos'})
            res.status(200).send({message:'Eliminado de favoritos'})
      }
      
   } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
   }
}