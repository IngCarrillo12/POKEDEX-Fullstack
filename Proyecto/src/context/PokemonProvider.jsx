import React, { useState } from 'react'
import { PokemonContext } from './PokemonContext'
import { useEffect } from 'react'
import { useForm } from '../hook/useForm'

export const PokemonProvider = ({ children }) => {
    const [globalPokemons, setglobalPokemons] = useState([])
    const [allpokemons, setallpokemons] = useState([])
    const [offset, setoffset] = useState(0)
    const [hiddenCargarMas, sethiddenCargarMas] = useState(false)
    // Estados para la aplicacion simples
    const [loading, setloading] = useState(true)
    const [active, setactive] = useState(false)
    //utilizar customHook - useForm
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch:''
    })

    //Llamar a 50 pokemones de la api
    const getAllPokemons = async(limit = 50)=>{
        try{
            const baseURL = 'https://pokeapi.co/api/v2/'
            const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
            const data = await res.json()
            const promises = data.results.map(async(pokemon)=>{
                const res = await fetch(pokemon.url)
                const data = await res.json()
                return data
            })
            const results = await Promise.all(promises)
            setallpokemons([...allpokemons, ...results])
            setloading(false)
            sethiddenCargarMas(false)
        }catch(e){
            console.log(e)
        }
        
    }
    //Peticion para traer todos los pokemones
        const getGlobalPokemons = async()=>{
            const baseURL = 'https://pokeapi.co/api/v2/'
            const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
            const data = await res.json().catch(e =>e)
            const promises = data.results.map(async(pokemon)=>{
                const res = await fetch (pokemon.url)
                const data = await res.json().catch(e =>e)
                return data
            })
            const results = await Promise.all(promises)
            setglobalPokemons(results)
            setloading(false)
            sethiddenCargarMas(false)
        }
    
    const  getPokemonId = async(id)=>{
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    }

    const btnCargarMas = ()=>{
        setoffset(offset + 50);
    }

    const [typeSelected, setTypeSelected] = useState({
		grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
	});

	const [filteredPokemons, setfilteredPokemons] = useState([]);

	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name.toLowerCase()]: e.target.checked,
		});

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name.toLowerCase())
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name.toLowerCase())
			);
			setfilteredPokemons([...filteredResults]);
		}
        
        sethiddenCargarMas(true)
        
          
	};
    useEffect(() => {
      getAllPokemons()
    }, [offset])
    
    useEffect(() => {
      getGlobalPokemons()
    }, [])
    
    

    


  return (
    <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allpokemons,
        globalPokemons,
        getPokemonId,
        btnCargarMas,
        loading,
        setloading,
        active,
        setactive,
        handleCheckbox,
        filteredPokemons,
        sethiddenCargarMas,
        hiddenCargarMas,
        
    }}>
        {children}
    </PokemonContext.Provider>
  )
}
