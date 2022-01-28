import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Navbar.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import context, { Provider } from "./../context";


const Navbar = () => {
  const contextValue = useContext(context);
  const { pathName, setPathName, isDarkMode, setIsDarkMode } = contextValue;
  return (
    <Provider value={contextValue}>
      <div className="navbar_container">
        <div className={`navbar_inner ${isDarkMode ? "navbar_inner_dark" : ""}`}>
          <div className="main_logo_area">
            <div
              className={`main_logo ${isDarkMode ? "main_logo_dark" : ""}`}
            ></div>
          </div>
          <div className="container_right">
            <div
              className={`menu_item_area ${
                isDarkMode ? "menu_item_area_dark" : ""
              }`}
            >
              <div className="nav_item">About</div>
              <div className="nav_item">Line up</div>
              <div className="nav_item">Ticket</div>
              <div className="nav_item">Map</div>
              <div className="nav_item">Shop</div>
            </div>
            <div className="func_area">
              <div className={`sign_in ${isDarkMode ? "sign_in_dark" : ""}`}>
                Sign in
              </div>
              <div className="switch_toggle"  onClick={() => setIsDarkMode([!isDarkMode])}>
                <div
                  className={`toggle_btn ${isDarkMode ? "toggle_btn_dark" : ""}`}
                ></div>
              </div>
              <div
                className={`icon icon_cart ${isDarkMode ? "icon_cart_dark" : ""}`}
              ></div>
              <div
                className={`icon icon_user ${isDarkMode ? "icon_user_dark" : ""}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};
export default Navbar;
