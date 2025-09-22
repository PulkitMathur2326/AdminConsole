import React, { useState } from "react";
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
import "./styles/App.scss"
 
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // start as logged in
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <BrowserRouter>
      <Header
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <div
        style={{
          marginLeft: isSidebarOpen ? "220px" : "0",
          padding: "20px",
          transition: "margin-left 0.3s ease"
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/configure" replace />} />
          <Route path="/configure" element={<ConfigureParameters />} />
          <Route path="/add-trigger" element={<AddTrigger />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
export default App;