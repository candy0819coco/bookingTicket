import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Navigator.scss";
import UserPanel from "./../UserPanel/UserPanel";
import ModalTool from "./../ModalTool/ModalTool";
import UserPanelContent from "./../UserPanelContent/UserPanelContent";
import Login from "./../Login/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import context, { Provider } from "./../context";

const Navigator = () => {
  const [userPanelShow, setUserPanelShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const contextValue = useContext(context);
  const { pathName, setPathName, isDarkMode, setIsDarkMode, userInfo } =
    contextValue;
  console.log("pathName", pathName);
  const [avatarImage, setAvatarImage] = useState();

  useEffect(() => {
    if (userInfo) {
      getAvatar();
    }
  }, [userInfo]);
  const handleCloseUserPanel = (e) => {
    setUserPanelShow(false);
    e.stopPropagation();
  };
  const handleCloseLoginModal = (e) => {
    console.log('e', e)
    setLoginModalShow(false);
    // e.stopPropagation();
  };

  const handleRenderUserPanel = () => {
    return (
      <UserPanel
        modalShow={userPanelShow}
        modalCloseFunction={handleCloseUserPanel}
        modalWidth={200}
        modalHeight={180}
        backgroundOpacity={0.6}
        modalInnerBackground={`#fff`}
      >
        <UserPanelContent closeModal={handleCloseUserPanel} />
      </UserPanel>
    );
  };
  console.log('loginModalShow', loginModalShow)

  const handleRenderLoginModal = () => {
    return (
      <ModalTool
        modalShow={loginModalShow}
        modalCloseFunction={handleCloseLoginModal}
        modalWidth={400}
        modalHeight={320}
        backgroundOpacity={0.6}
        modalInnerBackground={`#fff`}
      >
        <Login closeModal={handleCloseLoginModal} setLoginModalShow={setLoginModalShow}/>
      </ModalTool>
    );
  };
  const getAvatar = async () => {
    function toBase64(arrayBuffer) {
      return btoa(
        arrayBuffer.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    }
    let b64 = toBase64(userInfo.mPhoto.data);
    const mimeType = "image/jpg";
    let avatarUrl = `data:${mimeType};base64,${b64}`;
    setAvatarImage(avatarUrl);
  };

  return (
      <div className={`navbar_container`}>
        <div
          className={`navbar_inner ${isDarkMode ? "navbar_inner_dark" : ""}`}
        >
          <div className="main_logo_area">
            <Link
              className={`main_logo ${isDarkMode ? "main_logo_dark" : ""}`}
              id="nav_link"
              tabIndex="0"
              to="/"
              onClick={() => setPathName("home")}
            ></Link>
          </div>
          <div
            className={`menu_item_area ${isDarkMode ? "menu_item_dark" : ""}`}
          >
            <Link
              className={`nav_item ${pathName === "about" ? "current" : ""}`}
              id="nav_link"
              tabIndex="0"
              to="/about"
              onClick={() => setPathName("about")}
            >
              <div className="func_icon icon_ticket">About</div>
            </Link>
            <Link
              className={`nav_item ${pathName === "lineup" ? "current" : ""}`}
              id="nav_link"
              tabIndex="0"
              to="/lineUp"
              onClick={() => setPathName("lineup")}
            >
              <div className="func_icon icon_ticket">Line up</div>
            </Link>
            <Link
              className={`nav_item ${
                pathName === "ticketOrder" ? "current" : ""
              }`}
              id="nav_link"
              tabIndex="0"
              to="/ticketOrder"
              onClick={() => setPathName("ticketOrder")}
            >
              <div className="func_icon icon_ticket">Ticket</div>
            </Link>
            <Link
              className={`nav_item ${pathName === "map" ? "current" : ""}`}
              id="nav_link"
              tabIndex="0"
              to="/map"
              onClick={() => setPathName("map")}
            >
              <div className="func_icon icon_ticket">Map</div>
            </Link>
            <Link
              className={`nav_item ${pathName === "shop" ? "current" : ""}`}
              id="nav_link"
              tabIndex="0"
              to="/shop"
              onClick={() => setPathName("shop")}
            >
              <div className="func_icon icon_ticket">Shop</div>
            </Link>
          </div>
          <div className="func_area">
            <div
              className="switch_toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <div
                className={`switch_toggle_inner ${
                  isDarkMode ? "switch_toggle_inner_dark" : ""
                }`}
              >
                <div
                  className={`round ${isDarkMode ? "round_dark" : ""}`}
                ></div>
              </div>
            </div>
            <div
              className={`icon icon_cart ${isDarkMode ? "icon_cart_dark" : ""}`}
            ></div>
            {userInfo ? (
              <div
                className={`icon icon_user_is_logined ${
                  isDarkMode ? "icon_user_dark" : ""
                }`}
                id="iconUser"
                onClick={() => setUserPanelShow(true)}
                style={{ backgroundImage: `url(${avatarImage})` }}
              >
                {handleRenderUserPanel()}
              </div>
            ) : (
              <div
                className={`icon icon_user ${
                  isDarkMode ? "icon_user_dark" : ""
                }`}
                id="iconUser"
                onClick={() => setLoginModalShow(true)}
              >
                {handleRenderLoginModal()}
              </div>
            )}
            <div></div>
          </div>
        </div>
      </div>
  );
};
export default Navigator;
