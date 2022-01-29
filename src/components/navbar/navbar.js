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
        <div
          className={`navbar_inner ${isDarkMode ? "navbar_inner_dark" : ""}`}
        >
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
              <Link
                className={`nav_item ${pathName === "about" ? "current" : ""}`}
                to="/about"
                onClick={() => setPathName("about")}
              >
                About
              </Link>
              <Link
                className={`nav_item ${pathName === "lineup" ? "current" : ""}`}
                to="/lineUp"
                onClick={() => setPathName("lineup")}
              >
                Line up
              </Link>
              <Link
                className={`nav_item ${
                  pathName === "ticketOrder" ? "current" : ""
                }`}
                to="/ticketOrder"
                onClick={() => setPathName("ticketOrder")}
              >
                Ticket
              </Link>
              <Link
                className={`nav_item ${pathName === "map" ? "current" : ""}`}
                to="/map"
                onClick={() => setPathName("map")}
              >
                Map
              </Link>
              <Link
                className={`nav_item ${pathName === "shop" ? "current" : ""}`}
                to="/shop"
                onClick={() => setPathName("shop")}
              >
                Shop
              </Link>
            </div>
            <div className="func_area">
              <Link
                className={`sign_in ${isDarkMode ? "sign_in_dark" : ""}`}
                to="/signIn"
              >
                Sign in
              </Link>
              <div
                className="switch_toggle"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <div
                  className={`toggle_btn ${
                    isDarkMode ? "toggle_btn_dark" : ""
                  }`}
                >
                  <div
                    className={`round ${isDarkMode ? "round_dark" : ""}`}
                  ></div>
                </div>
              </div>
              <div
                className={`icon icon_cart ${
                  isDarkMode ? "icon_cart_dark" : ""
                }`}
              ></div>
              <Link
                className={`icon icon_user ${
                  isDarkMode ? "icon_user_dark" : ""
                }`}
                to="/user"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};
export default Navbar;
