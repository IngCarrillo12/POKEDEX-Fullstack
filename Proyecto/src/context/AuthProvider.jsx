import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc } from "firebase/firestore";
import { auth, db } from "../fireBase";
import { useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import Swal from "sweetalert2"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  const validatedError = (error)=>{
    if(error ==="auth/invalid-login-credentials"){
      Swal.fire({
        title: "ERROR",
        text: "Credenciales Invalidas",
        icon: "error"
      });
      return;
    }if(error==="auth/missing-password"){
      Swal.fire({
        title: "ERROR",
        text: "Ingrese su contrasena",
        icon: "error"
      });
      return;
    }if(error==="auth/invalid-email"){
      Swal.fire({
        title: "ERROR",
        text: "Email Invalido",
        icon: "error"
      });
      return;
    }if(error==="auth/missing-email"){
      Swal.fire({
        title: "ERROR",
        text: "Ingrese su correo",
        icon: "error"
      });
      return;
    }else{
      Swal.fire({
        title: "ERROR",
        text: error,
        icon: "error"
      });
      return;
    }
  }
  const signUp = async (email, password, nick, imageUrl) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      try {
        await updateProfile(user, {
          displayName: nick,
          photoURL: imageUrl,
        });
        const userId = user.uid;
        const userData = {
          name: nick,
          photoURL: imageUrl,
        };

        // Guardar los datos en Firestore
        const userDocRef = doc(db, 'users', userId);
        try {
          await setDoc(userDocRef, userData);
          console.log('Usuario registrado con éxito y datos adicionales guardados en Firestore.');
          return true;
        } catch (error) {
          validatedError(error.code)
          return false;
        }
      } catch (error) {
        validatedError(error.code)
        return false;
      }
    } catch (error) {
      validatedError(error.code)
      return false;
    }
  };

  const login = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      return true; // Devuelve true si el inicio de sesión es exitoso
    } catch (error) {
      validatedError(error.code)
      return false; // Devuelve false si hay un error durante el inicio de sesión
    }
  
  };
  
  const loginWithGoogle =()=>{
    const  GoogleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, GoogleProvider)
  }

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider value={{ signUp, login, user, logout, loginWithGoogle }}>
      {children}
    </authContext.Provider>
  );
};