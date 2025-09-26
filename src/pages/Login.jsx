import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./../styles/Login.scss";
 
const Login = ({ onLogin }) => {
  const [isForgotMode, setIsForgotMode] = useState(false);
 
  // login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
 
  // forgot password state
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(0);
 
  // handle login submit
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
 
    if (found) {
      console.log("Login found user:", found)
      onLogin(found);
    } else {
      setError("Invalid username or password");
    }
  };
 
  // handle send reset email
  const handleSend = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimer(60);
  };
 
  // handle resend email
  const handleResend = () => {
    setTimer(60);
  };
 
  // countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
 
  return (
    <div className="login-container">
      <div className="login-card">
        {!isForgotMode ? (
          <>
            <h2>Admin Console Login</h2>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setIsForgotMode(true);
                    setError("");
                  }}
                >
                  Forgot Password?
                </button>
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
          </>
        ) : (
          <>
            <h2>Forgot Password</h2>
            {!sent ? (
              <form onSubmit={handleSend}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
 
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="login-button"
                >
                  Send Reset Email
                </Button>
 
                <Button
                  variant="text"
                  fullWidth
                  className="back-button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setSent(false);
                    setEmail("");
                  }}
                >
                  Back to Login
                </Button>
              </form>
            ) : (
              <>
                <p>
                  A reset link has been sent to <strong>{email}</strong>.
                </p>
                <Button
                  variant="contained"
                  fullWidth
                  className="login-button"
                  onClick={handleResend}
                  disabled={timer > 0}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend Email"}
                </Button>
 
                <Button
                  variant="text"
                  fullWidth
                  className="back-button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setSent(false);
                    setEmail("");
                  }}
                >
                  Back to Login
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
 
export default Login;