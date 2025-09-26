import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit, Save, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import "./../styles/AddUser.scss";
 
export default function AddUser() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "", role: "Admin" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
 
  // load users from sessionStorage
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("users")) || [];
    setUsers(stored);
  }, []);
 
  const saveUsers = (updated) => {
    setUsers(updated);
    sessionStorage.setItem("users", JSON.stringify(updated));
  };
 
  /** Add new user */
  const handleAdd = () => {
    if (!formData.username || !formData.email) return;
 
    const emailExists = users.some(
      (u) => u.email.trim().toLowerCase() === formData.email.trim().toLowerCase()
    );
    if (emailExists) {
      alert(`A user with email "${formData.email}" already exists!`);
      return;
    }
 
    const newUser = {
      ...formData,
      password: formData.role === "Super Admin" ? "superadmin" : "admin",
    };
 
    const updated = [newUser, ...users];
    saveUsers(updated);
    setFormData({ username: "", email: "", role: "Admin" });
  };
 
  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setEditRowData(users[idx]);
  };
 
  const handleSaveEdit = (idx) => {
    const emailExists = users.some(
      (u, i) =>
        i !== idx &&
        u.email.trim().toLowerCase() === editRowData.email.trim().toLowerCase()
    );
    if (emailExists) {
      alert(`A user with email "${editRowData.email}" already exists!`);
      return;
    }
 
    const updated = [...users];
    updated[idx] = editRowData;
    saveUsers(updated);
    setEditingIndex(null);
  };
 
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditRowData({});
  };
 
  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      const updated = users.filter((_, i) => i !== deleteIndex);
      saveUsers(updated);
      setDeleteIndex(null);
    }
  };
 
  const togglePasswordVisibility = (idx) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };
 
  return (
    <div className="add-user">
      <h2>Add / Manage Users</h2>
 
      {/* Add form */}
      <div className="add-user-form">
        <TextField
          size="small"
          label="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter username"
        />
        <TextField
          size="small"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
        />
        <Select
          size="small"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Super Admin">Super Admin</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleAdd}>
          Add User
        </Button>
      </div>
 
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header-cell">Username</TableCell>
              <TableCell className="header-cell">Password</TableCell>
              <TableCell className="header-cell">Email</TableCell>
              <TableCell className="header-cell">Role</TableCell>
              <TableCell className="header-cell" align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, idx) => (
              <TableRow key={`${u.username}-${idx}`}>
                {editingIndex === idx ? (
                  <>
                    <TableCell>{u.username}</TableCell>
                    {/* Password column - masked */}
                    <TableCell>
                      {visiblePasswords[idx] ? u.password : "••••••"}
                      <IconButton
                        size="small"
                        onClick={() => togglePasswordVisibility(idx)}
                      >
                        {visiblePasswords[idx] ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="email"
                        value={editRowData.email}
                        onChange={(e) =>
                          setEditRowData({ ...editRowData, email: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={editRowData.role}
                        onChange={(e) =>
                          setEditRowData({ ...editRowData, role: e.target.value })
                        }
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Super Admin">Super Admin</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleSaveEdit(idx)} size="small">
                        <Save fontSize="small" />
                      </IconButton>
                      <IconButton onClick={handleCancelEdit} size="small">
                        <Close fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>
                      {visiblePasswords[idx] ? u.password : "••••••"}
                      <IconButton
                        size="small"
                        onClick={() => togglePasswordVisibility(idx)}
                      >
                        {visiblePasswords[idx] ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(idx)} size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => setDeleteIndex(idx)}
                        size="small"
                        color="default"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
 
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
 
      {/* Delete confirmation popup */}
      <Dialog open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user{" "}
            <strong>{deleteIndex !== null && users[deleteIndex].username}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIndex(null)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}