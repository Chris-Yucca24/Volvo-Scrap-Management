import logo from "../../assets/image-assets/Volvo-Spread-Word-Mark-Black 1.svg";
import avatarImg from "../../assets/image-assets/account_icon.png";
import DownArrow from "../../assets/image-assets/Down Arrow.png";
import NotificationIcon from "../../assets/image-assets/Notification_icon.svg";
import CalendarIcon from "../../assets/image-assets/Calender-icon.svg";

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
  {/* LEFT */}
  <div className="navbar-left">
    <div className="logo-sect">
    <img
      src={logo}
      alt="Volvo Logo"
      className="logo-img"
      onClick={() => handleNavigation("/admin")}
    />
    </div>

     <div className="greeting">
      Hii, John! Welcome back....
    </div>
    
  </div>

  {/* CENTER */}
  <div className="navbar-center">
   

    <div className="search-bar">
      <SearchIcon className="search-icon" />

      <input
        type="text"
        placeholder="Search..."
        className="search-input"
      />
    </div>
  </div>

  {/* RIGHT */}
  <div className="right-section">
    <div className="date-range">
      <img
        src={CalendarIcon}
        alt="calendar"
        className="calendar-icon"
      />

      <span>
        01 - June - 2026 to 13 - June - 2026
      </span>

      <img
        src={DownArrow}
        alt="dropdown"
        className="dropdown-arrow"
      />
    </div>

    {showSettings && (
      <div className="settings-wrapper">
        <img
          src={NotificationIcon}
          alt="notification"
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

    <div
      className="account-widget"
      onClick={() => setShowLog(!showLog)}
    >
      <div className="avatar-box">
        <img
          src={avatarImg}
          alt="avatar"
          className="avatar-img"
        />
      </div>

      <div className="account-info">
        <div className="name">John Doe </div>
        <div className="role">Admin</div>
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