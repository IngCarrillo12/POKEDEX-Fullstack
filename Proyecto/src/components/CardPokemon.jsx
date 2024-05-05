import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const CardPokemon = ({ pokemon }) => {
  const navigate = useNavigate();
  const { user, getFavorites, toggleFavoritos  } = useContext(authContext);
  const [favorito, setFavorito] = useState(false);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      const ids = data.map(data=> data.idpokemon.toString())
      const encontrado = data ? ids.includes(pokemon.id.toString()) : false;
      setFavorito(encontrado);
    } catch (error) {
      console.error('Error al cargar favoritos:', error.message);
    }
  };

  const handleCard = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      if(user){
      await toggleFavoritos(pokemon.id.toString(), user.idusers);
      // No necesitas cargar los favoritos nuevamente después de cambiarlos
      // La actualización de 'favorito' se realiza directamente después del toggle
      setFavorito((prevFavorito) => !prevFavorito);
    }else{
      Swal.fire({
        title: "info",
        text:'Registrarse/Loguearse para esta accion',
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: "Registrarse",
        denyButtonText: `Logearse`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/register')
        } else if (result.isDenied) {
          navigate('/login')
        }
      });
    }
    } catch (error) {
      console.error('Error al cambiar el estado favorito:', error.message);
    }
  };

  useEffect(() => {
    // Solo cargar los favoritos si hay un usuario autenticado
    if (user) {
      loadFavorites();
    } else {
      // Si no hay usuario, establecer 'favorito' en falso
      setFavorito(false);
    }
  }, [user, pokemon.id]); // Incluye 'pokemon.id' para que se actualice cuando cambie el Pokémon

  return (
    <div onClick={handleCard} className="card-pokemon">
      {!favorito ? (
        <img
          className='icon-favorito'
          onClick={handleFavorite}
          width="24"
          height="24"
          src="https://img.icons8.com/ios/24/like--v1.png"
          alt="like--v1"
        />
      ) : (
        <img
          className='icon-favorito'
          onClick={handleFavorite}
          width="24"
          height="24"
          src="https://img.icons8.com/fluency/24/like.png"
          alt="like"
        />
      )}
      <div className="pokemon-img">
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      </div>
      <div className="pokemon-info">
        <span className="pokemon-id">Nº{pokemon.id}</span>
        <h3 className="pokemon-name text-capitalize">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span className={`type ${type.type.name}`} key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
