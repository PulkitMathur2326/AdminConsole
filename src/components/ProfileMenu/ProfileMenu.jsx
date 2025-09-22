import React, { useState } from "react";
import "./ProfileMenu.scss";
 
const ProfileMenu = ({ isLoggedIn, setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);
 
  if (!isLoggedIn) {
    return (
      <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
        Login
      </button>
    );
  }
 
  return (
    <div className="profile-menu">
      <div className="profile-icon" onClick={() => setOpen(!open)}>
        👤
      </div>
      {open && (
        <div className="dropdown">
          <ul>
            <li>Settings</li>
            <li
              onClick={() => {
                setIsLoggedIn(false);
                setOpen(false); // close dropdown after logout
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
 
export default ProfileMenu;