import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import "./../styles/AddUser.scss";
 
function AddUser() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "Admin"
  });
 
  const handleInputChange = (e, field, index = null) => {
    if (index !== null) {
      // edit existing user
      const updatedUsers = [...users];
      updatedUsers[index][field] = e.target.value;
      setUsers(updatedUsers);
    } else {
      // new user
      setNewUser({ ...newUser, [field]: e.target.value });
    }
  };
 
  const handleAddUser = () => {
    // validation
    if (!newUser.username || !newUser.password || !newUser.email) {
      alert("All fields are required");
      return;
    }
    const duplicate = users.find(
      (u) => u.username === newUser.username || u.email === newUser.email
    );
    if (duplicate) {
      alert("Username or Email already exists");
      return;
    }
 
    setUsers([...users, newUser]);
    setNewUser({ username: "", password: "", email: "", role: "Admin" });
  };
 
  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };
 
  const handleEditUser = (index) => {
    setEditingIndex(index);
  };
 
  const handleSaveUser = () => {
    setEditingIndex(null);
  };
 
  const handleCancelEdit = () => {
    setEditingIndex(null);
  };
 
  return (
    <div className="add-user">
    <div>
      <h2>Add / Manage Users</h2>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Username"
          value={newUser.username}
          onChange={(e) => handleInputChange(e, "username")}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => handleInputChange(e, "password")}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Email"
          value={newUser.email}
          onChange={(e) => handleInputChange(e, "email")}
          style={{ marginRight: "10px" }}
        />
        <Select
          value={newUser.role}
          onChange={(e) => handleInputChange(e, "role")}
          style={{ marginRight: "10px", minWidth: "120px" }}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Super Admin">Super Admin</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </div>
 
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <TextField
                    value={user.email}
                    onChange={(e) => handleInputChange(e, "email", index)}
                  />
                ) : (
                  user.email
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Select
                    value={user.role}
                    onChange={(e) => handleInputChange(e, "role", index)}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                  </Select>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <>
                    <IconButton onClick={handleSaveUser}>
                      <Save />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit}>
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => handleEditUser(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(index)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}
 
export default AddUser;