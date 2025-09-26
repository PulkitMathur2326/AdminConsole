import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChangePasswordDialog from "../ChangePasswordDialog/ChangePasswordDialog";

const ProfileMenu = ({ setIsLoggedIn, currentUser, updateUserPassword }) => {
  console.log("Profile Menu props:", { currentUser, updateUserPassword })
  const [anchorEl, setAnchorEl] = useState(null);
  const [openChange, setOpenChange] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenChange(true);
          }}
        >
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsLoggedIn(false);
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <ChangePasswordDialog
        open={openChange}
        onClose={() => setOpenChange(false)}
        currentUser={currentUser}
        onPasswordChange={(newPwd) => {
          updateUserPassword(newPwd);
          setOpenChange(false);
        }}
      />
    </>
  );
};

export default ProfileMenu;
