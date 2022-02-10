import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Navigator.scss";
import UserPanel from "./../UserPanel/UserPanel";
import UserPanelContent from "./../UserPanelContent/UserPanelContent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import context, { Provider } from "./../context";

const Navigator = () => {
  const [userPanelShow,setUserPanelShow] = useState('false');//一開始先隱藏面板
  const contextValue = useContext(context);
  const { pathName, setPathName, isDarkMode, setIsDarkMode } = contextValue;

  const handleCloseUserPanel = (e) => {
    setUserPanelShow(false);
    e.stopPropagation();
  };

  return (
    <Provider value={contextValue}>
      <div className="navbar_container">
        <div
          className={`navbar_inner ${isDarkMode ? "navbar_inner_dark" : ""}`}
        >
          <div className="main_logo_area">
            <Link
              className={`main_logo ${isDarkMode ? "main_logo_dark" : ""}`} to="/" onClick={()=> setPathName("home")}
            ></Link>
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
              <div onClick={()=>setUserPanelShow("true")}
                 className={`icon icon_user ${
                  isDarkMode ? "icon_user_dark" : ""
                }`}
              ></div>
              <UserPanel
                modalShow={userPanelShow}
                modalCloseFunction={handleCloseUserPanel}
                modalWidth={290}
                modalHeight={350}
                backgroundOpacity={0.6}
                modalInnerBackground={`#fff`}
              >
                {/* //為什麼寬高要定在這裡 */}
                <UserPanelContent closeModal={handleCloseUserPanel} />
              </UserPanel>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};
export default Navigator;
