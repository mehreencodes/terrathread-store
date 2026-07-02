import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("terrathread_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("terrathread_users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("terrathread_users", JSON.stringify(users));
    const sessionUser = { name, email };
    setUser(sessionUser);
    localStorage.setItem("terrathread_user", JSON.stringify(sessionUser));
    return { success: true };
  };

  const login = (email, password) => {
    // Admin shortcut
    if (email === "admin@terrathread.com") {
      const sessionUser = { name: "Admin", email: "admin@terrathread.com" };
      setUser(sessionUser);
      localStorage.setItem("terrathread_user", JSON.stringify(sessionUser));
      return { success: true };
    }

    const users = JSON.parse(localStorage.getItem("terrathread_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: "Invalid email or password." };
    }
    const sessionUser = { name: found.name, email: found.email };
    setUser(sessionUser);
    localStorage.setItem("terrathread_user", JSON.stringify(sessionUser));
    return { success: true };
  };
const loginWithGoogle = (name, email) => {
  const sessionUser = { name, email, provider: "google" };
  setUser(sessionUser);
  localStorage.setItem("terrathread_user", JSON.stringify(sessionUser));
  return { success: true };
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("terrathread_user");
  };

  const updateProfile = (name, email) => {
    const sessionUser = { ...user, name, email };
    setUser(sessionUser);
    localStorage.setItem("terrathread_user", JSON.stringify(sessionUser));
    const users = JSON.parse(localStorage.getItem("terrathread_users") || "[]");
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, name, email } : u
    );
    localStorage.setItem("terrathread_users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}