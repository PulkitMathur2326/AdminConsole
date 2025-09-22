import "./Header.scss";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
 
const Header = ({ toggleSidebar, isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="header">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="header-title">Admin Console</div>
      <div className="header-right">
        <ProfileMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </header>
  );
};
 
export default Header;