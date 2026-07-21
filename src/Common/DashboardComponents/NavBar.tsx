import logo from "../../assets/image-assets/Volvo-Spread-Word-Mark-Black 1.svg";
import avatarImg from "../../assets/image-assets/account_icon.png";
import DownArrow from "../../assets/image-assets/Down Arrow.png";
import SettingsIcon from "../../assets/image-assets/settings_ic.png";

import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

type NavBarProps = {
  showSettings?: boolean;
};

export default function NavBar({
  showSettings = false,
}: NavBarProps) {
  const [showLog, setShowLog] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setShowSettingsMenu(false);
    navigate(path);
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <img
        src={logo}
        alt="Volvo Logo"
        className="logo-img"
        onClick={() => handleNavigation("/admin")}
      />

      {/* CENTER SECTION */}
      <div className="navbar-center">
        {/* Greeting */}
        <div className="greeting-section">
          <div className="greeting" style={{marginLeft:"50px"}}>
            Hello, Leonardo!  Welcome back....
          </div>

          
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <SearchIcon className="search-icon" />

          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        {/* SETTINGS */}
        {showSettings && (
          <div className="settings-wrapper">
            <img
              src={SettingsIcon}
              alt="settings"
              className="settings-icon"
              onClick={() =>
                setShowSettingsMenu(!showSettingsMenu)
              }
            />

            {showSettingsMenu && (
              <div className="settings-dropdown">
                <p onClick={() => handleNavigation("/UserManagement")}>
                  User Management
                </p>

                <p onClick={() => handleNavigation("/MaterialSettings")}>
                  Material Settings
                </p>

                <p onClick={() => handleNavigation("/LevelManagement")}>
                  Log Export
                </p>
              </div>
            )}
          </div>
        )}

        {/* ACCOUNT */}
        <div
          className="account-widget"
          onClick={() => setShowLog(!showLog)}
        >
          <div className="avatar-box">
            <img
              src={avatarImg}
              alt="User Avatar"
              className="avatar-img"
            />
          </div>

          <div>
            <div className="name">
              Leonardo Lian
            </div>

            <div className="role">
              Environmental engineer
            </div>
          </div>

          <img
            src={DownArrow}
            alt="dropdown"
            className="dropdown-arrow"
          />

          {showLog && (
            <div className="logout-menu">
              <p
                onClick={() => {
                  setShowLog(false);
                  navigate("/");
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}