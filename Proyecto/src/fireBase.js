// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)

export const MostrarFavoritos = async (id) => {
  const favoritosCollectionRef = collection(db, 'favoritos');

  // Crear una consulta para obtener los favoritos del usuario actual
  const favoritosQuery = query(favoritosCollectionRef, where('userId', '==', id));

  try {
    const querySnapshot = await getDocs(favoritosQuery);

    if (querySnapshot.empty) {
      // El usuario no tiene una colección de favoritos, así que la creamos
      const newFavoritosData = {
        userId: id,
        pokemonsIds: [],
      };

      await setDoc(doc(db, 'favoritos', id), newFavoritosData);

      // Devolvemos la nueva colección de favoritos creada
      return newFavoritosData;
    } else {
      // El usuario ya tiene una colección de favoritos, devolvemos los datos
      const favoritosData = querySnapshot.docs[0].data();
      return favoritosData;
    }
  } catch (error) {
    console.error('Error al obtener o crear favoritos:', error);
    throw error;
  }
};
export const toggleFavoritos =async(userId, pokemonId)=>{
  const db = getFirestore(app);
  const favoritosCollectionRef = collection(db, 'favoritos');
  // Crear una consulta para verificar si el documento ya existe para el usuario actual
  const favoritosQuery = query(favoritosCollectionRef, where('userId', '==', userId));
  // Obtener los documentos que cumplen con la consulta
  const querySnapshot = await getDocs(favoritosQuery);

  if (querySnapshot.empty) {
    // El documento no existe, entonces lo creamos con el itemId
    await setDoc(doc(favoritosCollectionRef), {
      userId: userId,
      pokemonsIds: [pokemonId],
    });
  } else {
    // El documento existe, entonces lo actualizamos
    const favoritoDoc = querySnapshot.docs[0]; // Suponemos que solo hay un documento por usuario
    const pokemonsIdsActuales = favoritoDoc.data().pokemonsIds || [];

    if (pokemonsIdsActuales.includes(pokemonId)) {
      // El itemId está presente, lo eliminamos
      const pokemonsIdsActualizados = pokemonsIdsActuales.filter((id) => id !== pokemonId);
      await updateDoc(favoritoDoc.ref, {
        pokemonsIds: pokemonsIdsActualizados,
      });
    } else {
      // El itemId no está presente, lo agregamos
      const pokemonsIdsActualizados = [...pokemonsIdsActuales, pokemonId];
      await updateDoc(favoritoDoc.ref, {
        pokemonsIds: pokemonsIdsActualizados,
      });
    }
  }
}