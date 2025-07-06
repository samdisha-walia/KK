import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";  // ✅ YOU NEED THIS

import Layout from "./Layout";

function App() {
  // Auth state from localStorage
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  // Login method
  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setLoggedIn(true);
    setUsername(username);
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      <BrowserRouter>
        <Routes>
          {/* Routes without Navbar/Footer */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Routes with Navbar/Footer */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />

          
          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
