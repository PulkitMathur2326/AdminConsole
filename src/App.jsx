import React, { useEffect, useState } from "react";
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
import ResetPassword from "./pages/ResetPassword";
import "./styles/App.scss";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Seed only if users not already in sessionStorage
    if (!sessionStorage.getItem("users")) {
      const seedUsers = [
        {
          username: "admin",
          password: "admin",
          email: "admin@example.com",
          role: "Admin"
        },
        {
          username: "superadmin",
          password: "superadmin",
          email: "superadmin@example.com",
          role: "Super Admin"
        }
      ];
      sessionStorage.setItem("users", JSON.stringify(seedUsers));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = 220;

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          <Header
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            currentUser={loggedInUser}
            updateUserPassword={(newPwd) => {
              if (!loggedInUser) return;

              const updated = { ...loggedInUser, password: newPwd };
              setLoggedInUser(updated);

              // update users list in sessionStorage
              const users = JSON.parse(sessionStorage.getItem("users")) || [];
              const idx = users.findIndex((u) => u.username === updated.username);
              if (idx !== -1) {
                users[idx] = updated;
                sessionStorage.setItem("users", JSON.stringify(users));
              }
            }}
          />
          <Sidebar isOpen={isSidebarOpen} role={loggedInUser?.role} />
          <div
            style={{
              marginTop: "60px",
              marginLeft: isSidebarOpen ? `${sidebarWidth}px` : "0",
              padding: "20px",
              transition: "margin-left 0.3s ease"
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/configure" replace />} />
              <Route path="/configure" element={<ConfigureParameters />} />
              <Route path="/add-trigger" element={<AddTrigger />} />

              {/* Only Super Admin can access AddUser */}
              <Route
                path="/add-user"
                element={
                  loggedInUser?.role === "Super Admin" ? (
                    <AddUser />
                  ) : (
                    <Navigate to="/configure" replace />
                  )
                }
              />

              <Route path="*" element={<Navigate to="/configure" replace />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLogin={(user) => {
                  console.log("App onLogin user:", user)
                  setIsLoggedIn(true);
                  setLoggedInUser(user);
                }}
              />
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;