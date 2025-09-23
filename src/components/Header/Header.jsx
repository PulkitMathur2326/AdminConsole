import "./Header.scss";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined"; // sidebar icon
 
const Header = ({ toggleSidebar, isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="header">
      <div className="header-left">
      <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <ViewSidebarOutlinedIcon fontSize="medium" /> {/* medium size matches text */}
      </button>
      <div className="header-title">Admin Console</div>
      </div>
      <div className="header-right">
        <ProfileMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </header>
  );
};
 
export default Header;
 