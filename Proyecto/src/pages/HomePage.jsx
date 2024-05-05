import React, { useContext } from 'react'
import {PokemonList, FilterBar, Loader} from '../components'
import { PokemonContext } from '../context/PokemonContext'
import { useNavigate } from 'react-router-dom'
export const HomePage = () => {
  const { btnCargarMas, active, setactive, hiddenCargarMas} = useContext(PokemonContext)
  const navigate = useNavigate()
	const pokemonAleatorio = ()=>{
		const numeroAleatorio = Math.floor(Math.random() * 898) + 1;
		navigate(`/pokemon/${numeroAleatorio}`)
	}

  
  
  return (
  <>
      <div className="container-filter container">
    <div className="icon-filter" onClick={()=>{setactive(!active)}}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
    <span>Filtrar</span>
</div>
<button className='btn btn-login' onClick={pokemonAleatorio}>Aleatorio</button>
</div>
      <PokemonList />
      <FilterBar />
      <div className="container-btn-load container">
        <button className={`btn btn-load ${hiddenCargarMas?'hidden':''}`}  onClick={btnCargarMas}>
          Cargar mas
        </button>
      </div>
    
    </>
  )
}
