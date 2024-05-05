import React, { useContext, useState } from 'react';
import {doc, setDoc } from 'firebase/firestore';
import {updateProfile } from 'firebase/auth';
import { db, auth } from "../fireBase"
import { authContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ModalAvatares = ({setChangeAvatar}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { user } = useContext(authContext)
  const navigate = useNavigate()
  const avatars = [
    // Rutas a tus imágenes locales
    "/jovencito.webp",
    "/jovencito2.webp",
    "/jovencita.webp",
    "/jovencita2.webp",
    "/pikachu.webp",
    "/purpuraAzul.webp"
  ];
  const handleCardClick = (index) => {
    setSelectedAvatar(index === selectedAvatar ? null : index);
  };
  const handleChangePhoto = async () => {
    if (selectedAvatar !== null) {
        const userDocRef = doc(db, 'users', user.uid);
        const avatarPath = avatars[selectedAvatar];
    
        // Actualizar el campo imageUrl en Firestore
        await setDoc(userDocRef, { photoURL: avatarPath }, { merge: true });
    
        // Actualizar manualmente la propiedad photoURL en la autenticación del usuario
        await updateProfile(auth.currentUser, { photoURL: avatarPath });
        navigate('/')
        setChangeAvatar(false)
    }
  };

  return (
    <>
      <div className="modal">
        <div className='modal-contenido'>
          <h1>Elige un avatar</h1>
          <img onClick={()=>setChangeAvatar(false)} className="iconClose-modal" width="24" height="24" src="https://img.icons8.com/fluency-systems-filled/24/x.png" alt="x"/>
          <div className='contenido-cardAvatar'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`card-avatar ${selectedAvatar === index ? 'selected' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <img src={avatar} alt={`Avatar ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className='btn btn-login' onClick={handleChangePhoto}>Cambiar Foto</button>
        </div>
      </div>
    </>
  );
};
