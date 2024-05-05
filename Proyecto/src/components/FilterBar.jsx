import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'


export const FilterBar = () => {
    const {active ,handleCheckbox,setactive} = useContext(PokemonContext)
	
  return (
  <div className={`filter ${active?'active':''}`}>
    <div className="filter-contenido">
		<div className="title-icon">
		<span>Filtro</span>
		<svg onClick={()=>{setactive(!active)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  	<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
		</svg>
	
		</div>
        <form className="contenido-types">
        <div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='grass'
						id='grass'
					/>
					<label htmlFor='grass'>Planta</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='fire'
						id='fire'
					/>
					<label htmlFor='fire'>Fuego</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='bug'
						id='bug'
					/>
					<label htmlFor='bug'>Bicho</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='fairy'
						id='fairy'
					/>
					<label htmlFor='fairy'>Hada</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='dragon'
						id='dragon'
					/>
					<label htmlFor='dragon'>Dragón</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='ghost'
						id='ghost'
					/>
					<label htmlFor='ghost'>Fantasma</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='ground'
						id='ground'
					/>
					<label htmlFor='ground'>Tierra</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='normal'
						id='normal'
					/>
					<label htmlFor='normal'>Normal</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='psychic'
						id='psychic'
					/>
					<label htmlFor='psychic'>Psíquico</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='steel'
						id='steel'
					/>
					<label htmlFor='steel'>Acero</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='dark'
						id='dark'
					/>
					<label htmlFor='dark'>Siniestro</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='electric'
						id='electric'
					/>
					<label htmlFor='electric'>Eléctrico</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='fighting'
						id='fighting'
					/>
					<label htmlFor='fighting'>Lucha</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='flying'
						id='flying'
					/>
					<label htmlFor='flying'>Volador</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='ice'
						id='ice'
					/>
					<label htmlFor='ice'>Hielo</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='poison'
						id='poison'
					/>
					<label htmlFor='poison'>Veneno</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='rock'
						id='rock'
					/>
					<label htmlFor='rock'>Roca</label>
				</div>
				<div className='group-type'>
					<input
						type='checkbox'
						onChange={handleCheckbox}
						name='water'
						id='water'
					/>
					<label htmlFor='water'>Agua</label>
				</div>
       
        </form>
    </div>
</div>

  )
}
