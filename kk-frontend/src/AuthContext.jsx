import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("access");
    const savedUsername = localStorage.getItem("username");
    if (savedToken && savedUsername) {
      setLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("access", token);
    localStorage.setItem("username", user);
    setLoggedIn(true);
    setUsername(user);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
