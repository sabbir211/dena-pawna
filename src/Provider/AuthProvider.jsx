import React, { useEffect, useState } from "react";
import { sendUserToDb } from "../Utils/sendUserToDb";
import { createContext } from "react";
import { auth } from "../Utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  reload,
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
  const [dbUser, setDbUser] = useState(null);

  async function getDatabaseProfile(firebaseUser) {
    const token = await firebaseUser.getIdToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Unable to load your profile.");
    }

    const data = await response.json();
    return data.user;
  }

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
          // console.log("User sent to database:", data);
        } catch (dbError) {
          // console.error("Failed to sync user to database:", dbError);
          setError(
            "Account created, but we couldn't finish setting up your profile. Please try logging in again.",
          );
        }

        setUser(user);
        setLoading(false);
        return user;
      })
      .catch((error) => {
        // console.error("Error creating user:", error);
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
          // console.error("Failed to sync user to database:", error);
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
        // console.error("Failed to sync user to database:", error);
        setError(
          "Account logged in, but we couldn't finish setting up your profile. Please try logging in again.",
        );
      }

      setLoading(false);
    });
  }

  async function updateUserProfile(profile) {
    if (!auth.currentUser) {
      throw new Error("You must be logged in to update your profile.");
    }

    const firebaseProfile = {
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    };
    await updateProfile(auth.currentUser, firebaseProfile);
    await reload(auth.currentUser);
    setUser(auth.currentUser);

    const token = await auth.currentUser.getIdToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.displayName,
          phone: profile.phone,
          photoUrl: profile.photoURL,
        }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Unable to update your profile.");
    }

    const data = await response.json();
    setDbUser(data.user);
    return { firebaseUser: auth.currentUser, databaseUser: data.user };
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setDbUser(null);
        setLoading(false);
        return;
      }

      try {
        setDbUser(await getDatabaseProfile(currentUser));
      } catch (profileError) {
        setDbUser(null);
        setError(profileError.message);
      } finally {
        setLoading(false);
      }
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
        // console.log("Failed to sign out");
      });
  }

  const data = {
    user,
    dbUser,
    createUser,
    loginUser,
    LogOut,
    loading,
    setLoading,
    setUser,
    continueWithGoogle,
    updateUserProfile,
    error,
    setError,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
