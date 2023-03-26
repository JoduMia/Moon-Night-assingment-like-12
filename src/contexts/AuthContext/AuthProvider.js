import React, { createContext } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

const auth = getAuth(app);
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const emailPassUserCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const emailPassSignIn = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo)
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [])



  //authinfo data as object to lift up like an antena....
  const authInfo = {
    user,
    loading,
    setLoading,
    emailPassUserCreate,
    emailPassSignIn,
    updateUser,
    signInGoogle,
    logOut,
  }

  //main return.....
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;