import "./Header.scss";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
 
const Header = ({ toggleSidebar, isLoggedIn, setIsLoggedIn, currentUser, updateUserPassword }) => {
  console.log("Header props:", { isLoggedIn, currentUser });
  return (
    <header className="header">
      <div className="header-left">
      <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <ViewSidebarOutlinedIcon fontSize="medium" />
      </button>
      <div className="header-title">Admin Console</div>
      </div>
      <div className="header-right">
        <ProfileMenu setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} updateUserPassword={updateUserPassword} />
      </div>
    </header>
  );
};
 
export default Header;
 