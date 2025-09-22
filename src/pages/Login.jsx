import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import "./../styles/Login.scss";
 
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Simple hardcoded check (replace with backend later)
    if (username === "admin" && password === "admin") {
      onLogin(); // callback to parent
    } else {
      alert("Invalid username or password");
    }
  };
 
  return (
    <div className="login-page">
      <Paper elevation={3} className="login-card">
        <Typography variant="h5" gutterBottom>
          Admin Console Login
        </Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}