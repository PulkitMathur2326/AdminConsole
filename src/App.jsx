import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import ConfigureParameters from "./pages/ConfigureParameters";
import AddTrigger from "./pages/AddTrigger";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import "./styles/App.scss";
 
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
 
  // Load users + loggedInUser from sessionStorage
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
 
    // initialize default users if none exist
    const existing = JSON.parse(sessionStorage.getItem("users")) || [];
    if (existing.length === 0) {
      const defaultUsers = [
        {
          username: "admin",
          email: "admin1@example.com",
          role: "Admin",
          password: "admin"
        },
        {
          username: "superadmin",
          email: "superadmin@example.com",
          role: "Super Admin",
          password: "superadmin"
        }
      ];
      sessionStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  };
 
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    sessionStorage.removeItem("loggedInUser");
  };
 
  return (
    <BrowserRouter>
      {isLoggedIn && (
        <Header
          toggleSidebar={toggleSidebar}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          onLogout={handleLogout}
        />
      )}
 
      {isLoggedIn && (
        <Sidebar isOpen={isSidebarOpen} role={loggedInUser?.role} />
      )}
 
      <div
        style={{
          marginLeft: isLoggedIn && isSidebarOpen ? "220px" : "0",
          padding: "20px",
          transition: "margin-left 0.3s ease"
        }}
      >
        <Routes>
          {!isLoggedIn ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Navigate to="/configure" replace />} />
              <Route path="/configure" element={<ConfigureParameters />} />
              <Route path="/add-trigger" element={<AddTrigger />} />
              {loggedInUser?.role === "Super Admin" && (
                <Route path="/add-user" element={<AddUser />} />
              )}
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default App;