import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
 
const passwordRules = [
  { key: "length", text: "At least 8 characters" },
  { key: "uppercase", text: "At least one uppercase letter" },
  { key: "lowercase", text: "At least one lowercase letter" },
  { key: "digit", text: "At least one number" },
  { key: "special", text: "At least one special character" },
];
 
const validatePassword = (pwd) => ({
  length: pwd.length >= 8,
  uppercase: /[A-Z]/.test(pwd),
  lowercase: /[a-z]/.test(pwd),
  digit: /\d/.test(pwd),
  special: /[^A-Za-z0-9]/.test(pwd),
});
 
const ChangePasswordDialog = ({ open, onClose, onPasswordChange, currentUser }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [error, setError] = useState("");
 
  const rulesCheck = validatePassword(form.newPassword);
 
  // ✅ Reset form every time dialog opens
  useEffect(() => {
    if (open) {
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShow({ current: false, new: false, confirm: false });
      setError("");
    }
  }, [open]);
 
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };
 
  const handleSave = () => {
    if (!currentUser) {
      setError("No user is logged in.");
      return;
    }
    if (form.currentPassword !== currentUser.password) {
      setError("Current password is incorrect.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (!Object.values(rulesCheck).every(Boolean)) {
      setError("Password does not meet requirements.");
      return;
    }
    onPasswordChange(form.newPassword);
  };
 
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        {/* Rules */}
        <List dense>
          {passwordRules.map((rule) => (
            <ListItem
              key={rule.key}
              sx={{ color: rulesCheck[rule.key] ? "green" : "red", fontSize: "0.85rem" }}
            >
              {rule.text}
            </ListItem>
          ))}
        </List>
 
        <TextField
          fullWidth
          margin="dense"
          label="Current Password"
          type={show.current ? "text" : "password"}
          value={form.currentPassword}
          onChange={(e) => handleChange("currentPassword", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((prev) => ({ ...prev, current: !prev.current }))}>
                  {show.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
 
        <TextField
          fullWidth
          margin="dense"
          label="New Password"
          type={show.new ? "text" : "password"}
          value={form.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((prev) => ({ ...prev, new: !prev.new }))}>
                  {show.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
 
        <TextField
          fullWidth
          margin="dense"
          label="Confirm Password"
          type={show.confirm ? "text" : "password"}
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() =>
                  setShow((prev) => ({ ...prev, confirm: !prev.confirm }))
                }>
                  {show.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
 
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default ChangePasswordDialog;