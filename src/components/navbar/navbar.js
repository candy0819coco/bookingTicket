import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Navbar.scss";

const Navbar = () => {
  const [isDarkMode,setIsDarkMode] = useState(false)
  return (
    <div className="navbar_container">
      <div className={`navbar_inner ${isDarkMode ?"navbar_inner_dark":""}`}>
        <div className="main_logo_area">
          <div className={`main_logo ${isDarkMode ? "main_logo_dark" : ""}`}></div>
        </div>
        <div className="container_right">
          <div className="menu_item_area">
            <div className="nav_item">About</div>
            <div className="nav_item">Line up</div>
            <div className="nav_item">Ticket</div>
            <div className="nav_item">Map</div>
            <div className="nav_item">Shop</div>
          </div>
          <div className="func_area">
            <div className="sign_in">Sign in</div>
          <div
            className="switch_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div
              className={`switch_toggle_inner ${
                isDarkMode ? "switch_toggle_inner_dark" : ""
              }`}
            >
              <div className={`toggle_btn ${isDarkMode ? "toggle_btn_dark" : ""}`}></div>
            </div>
          </div>
            <div className="icon icon_cart"></div>
            <div className="icon icon_user"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
