import React, { useContext, useEffect, useState } from 'react';
import { MostrarFavoritos, toggleFavoritos } from '../fireBase';
import { authContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CardPokemon = ({ pokemon }) => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [favorito, setFavorito] = useState(false);

  const loadFavorites = async () => {
    try {
      const data = await MostrarFavoritos(user.uid);
      const ids = data.pokemonsIds;
      const encontrado = ids ? ids.includes(pokemon.id.toString()) : false;
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
      await toggleFavoritos(user.uid, pokemon.id.toString());
      // No necesitas cargar los favoritos nuevamente después de cambiarlos
      // La actualización de 'favorito' se realiza directamente después del toggle
      setFavorito((prevFavorito) => !prevFavorito);
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
