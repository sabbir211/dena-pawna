import React, { useEffect, useState } from "react";
import { sendUserToDb } from "../Utils/sendUserToDb";
import { createContext } from "react";
import { auth } from "../Utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();
export default function AuthProvider({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  function createUser(email, password, name, phone) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });

        const token = await user.getIdToken();

        try {
          const data = await sendUserToDb(
            token,
            user.photoURL,
            name,
            user.email,
            phone,
          );
          console.log("User sent to database:", data);
        } catch (dbError) {
          console.error("Failed to sync user to database:", dbError);
          setError(
            "Account created, but we couldn't finish setting up your profile. Please try logging in again.",
          );
        }

        setUser(user);
        setLoading(false);
        return user;
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setError(error.message);
        setLoading(false);
        throw error;
      });
  }

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        try {
          const token = await userCredential.user.getIdToken();
          await sendUserToDb(
            token,
            userCredential.user.photoURL,
            userCredential.user.displayName,
            userCredential.user.email,
            null,
          );
          setLoading(false);
        } catch (error) {
          console.error("Failed to sync user to database:", error);
          setError(
            "Account logged in, but we couldn't finish setting up your profile. Please try logging in again.",
          );
        }
      },
    );
  }
  function continueWithGoogle() {
    setLoading(true);
    return signInWithPopup(auth, provider).then(async (userCredential) => {
      try {
        const token =await userCredential.user.getIdToken();
        await sendUserToDb(
          token,
          userCredential.user.photoURL,
          userCredential.user.displayName,
          userCredential.user.email,
          null,
        );
      } catch (error) {
        console.error("Failed to sync user to database:", error);
        setError(
          "Account logged in, but we couldn't finish setting up your profile. Please try logging in again.",
        );
      }
      setLoading(false);
    });
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
    continueWithGoogle,
    error,
    setError,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
