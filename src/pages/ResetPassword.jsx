import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.scss";
 
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  // validation checks
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
 
  const isPasswordValid =
    validations.length &&
    validations.uppercase &&
    validations.lowercase &&
    validations.digit &&
    validations.special;
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError("Password does not meet the requirements.");
      setSuccess("");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }
    setError("");
    setLoading(true);
 
    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("Your password has been reset successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1500);
  };
 
  const renderRule = (condition, text) => (
    <p
      style={{
        color: condition ? "green" : "red",
        display: "flex",
        alignItems: "center",
        fontSize: "0.85rem",
        margin: "2px 0"
      }}
    >
      {condition ? (
        <CheckCircle fontSize="small" style={{ marginRight: "4px" }} />
      ) : (
        <Cancel fontSize="small" style={{ marginRight: "4px" }} />
      )}
      {text}
    </p>
  );
 
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Reset Password</h2>
 
        {success && <p className="success-text">{success}</p>}
 
        <form onSubmit={handleSubmit}>
          {/* ✅ Password rules moved above fields */}
          <div style={{ marginBottom: "0.5rem" }}>
            {renderRule(validations.length, "At least 8 characters")}
            {renderRule(validations.uppercase, "At least one uppercase letter")}
            {renderRule(validations.lowercase, "At least one lowercase letter")}
            {renderRule(validations.digit, "At least one digit")}
            {renderRule(validations.special, "At least one special character")}
          </div>
 
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
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
 
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirm(!showConfirm)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
 
          {/* ✅ Error shown below fields */}
          {error && <p className="error-text">{error}</p>}
 
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-button"
            disabled={loading || !!success}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};
 
export default ResetPassword;