import React, { useEffect, useState } from "react";

import { createContext } from "react";
import { auth } from "../Utils/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

const provider=new GoogleAuthProvider();
export default function AuthProvider({ children }) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  function createUser(email, password,name) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: name
      }).then(() => {
        setUser(user);
        setLoading(false);
      }).catch((error) => {
        console.error("Error updating profile:", error);
        setLoading(false);
      });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      setLoading(false);
    });
  }

  function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function continueWithGoogle() {
    setLoading(true)
    return signInWithPopup(auth, provider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function LogOut() {
    signOut(auth)
      .then(() => {
        alert("Log out successful");
      })
      .catch(() => {
        console.log("Failed to sign out");
      });
  }

  const data = {
    user,
    createUser,
    loginUser,
    LogOut,
    loading,
    setLoading,
    setUser,
    continueWithGoogle
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
