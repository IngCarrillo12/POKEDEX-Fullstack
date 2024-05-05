import React, { useContext, useEffect, useState } from 'react'
import { MostrarFavoritos } from "../fireBase"
import { authContext } from '../context/AuthContext'
import { PokemonContext } from '../context/PokemonContext'
import { CardPokemon, Loader } from "../components/index"
export const FavoritosPage = () => {
    const { user } = useContext(authContext)
    const { globalPokemons } = useContext(PokemonContext)
    const [loading, setLoading] = useState(true)
    const [favorites, setfavorites] = useState([])
    const loadFavorite = async()=>{
        const data = await MostrarFavoritos(user.uid)
        const ids = await data.pokemonsIds
        if(ids){
            const pokemonsFavorites = globalPokemons.filter(pokemon=> ids.includes(""+pokemon.id))
            setfavorites(pokemonsFavorites)
            setLoading(false)
        }

    }
    useEffect(() => {
      loadFavorite()
    }, [user])
    
  return (
    <div className="container">
  {
    loading?(
      <Loader/>
    ):(
        <>
        {
          favorites.length===0?(
            <div >
            <h1>Aun no tienes pokemones favoritos</h1>
            </div>
          ):(
            <div className="card-list-pokemon">
            {
            favorites.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id} />)
            }
             </div>
            
          )
           
        }
       </>
    )
  }
   
    
      
  </div>
  )
}
