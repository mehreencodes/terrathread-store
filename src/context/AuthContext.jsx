import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth state changes (persists across refresh/devices)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Save the display name on the Firebase user profile
      await firebaseUpdateProfile(result.user, { displayName: name });
      setUser({ uid: result.user.uid, name, email });
      return { success: true };
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        message = "An account with this email already exists.";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }
      return { success: false, message };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName || "User",
        email: result.user.email,
      });
      return { success: true };
    } catch (err) {
      let message = "Invalid email or password.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        message = "Invalid email or password.";
      }
      return { success: false, message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName || "User",
        email: result.user.email,
        provider: "google",
      });
      return { success: true };
    } catch (err) {
      console.error("Google login error:", err.code, err.message);
      return { success: false, message: "Google sign-in failed. Please try again." };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateProfile = async (name, email) => {
    try {
      if (auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, { displayName: name });
      }
      setUser((prev) => ({ ...prev, name, email }));
      return { success: true };
    } catch (err) {
      return { success: false, message: "Could not update profile." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}