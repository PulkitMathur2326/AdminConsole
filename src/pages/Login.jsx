import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./../styles/Login.scss";
 
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
 
    if (found) {
      onLogin(found);
    } else {
      setError("Invalid username or password");
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Console Login</h2>
 
        {error && <p className="error-text">{error}</p>}
 
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
 
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
 
          <div className="forgot-password">
            <Link to="/reset-password">Forgot Password?</Link>
          </div>
 
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-button"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
 
export default Login;