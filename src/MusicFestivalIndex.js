import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./MusicFestivalIndex.scss";
import { Provider } from "./components/context";
import Navigator from "./components/Navigator/Navigator";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import TicketOrder from "./components/TicketOrder/TicketOrder";
import Shop from "./components/Shop/Shop";
import LineUp from "./components/LineUp/LineUp";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import UserPanel from "./components/UserPanel/UserPanel";
import ModalTool from "./components/ModalTool/ModalTool";
import UserPanelContent from "./components/UserPanelContent/UserPanelContent";
import Login from "./components/Login/Login";

const MusicFestivalIndex = () => {
  const [pathName, setPathName] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [userPanelShow, setUserPanelShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  console.log("userInfo", userInfo);

  const checkIsLogined = async () => {
    let localAccessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "";
    if (localAccessToken) {
      await axios({
        method: "get",
        url: `http://localhost:3400/member/check_login`,
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: localAccessToken,
        },
      })
        .then(function (response) {
          console.log("response", response);
          console.log("check_login_result", response.data);
          if (response.data.statusCode === 200) {
            setUserInfo(response.data.userInfo);
            setAccessToken(localAccessToken);
          } else {
            setUserInfo();
            console.log("token失效 請重新登入");
            setAccessToken("");
          }
        })
        .catch((error) => {
          console.log("check_login_error", error);
        });
    } else {
      setUserInfo();
      console.log("token失效 請重新登入");
      setAccessToken("");
    }
  };

  useEffect(() => {
    checkIsLogined();
  }, []);

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
        <Login closeModal={handleCloseLoginModal} />
      </ModalTool>
    );
  };

  const handleCloseUserPanel = (e) => {
    if (e && e.target.className === "background") {
      e.stopPropagation();
    }
    setUserPanelShow(false);
  };

  const handleCloseLoginModal = (e) => {
    if (e && e.target.className === "background") {
      e.stopPropagation();
    }
    setLoginModalShow(false);
  };

  const contextValue = {
    pathName,
    setPathName,
    isDarkMode,
    setIsDarkMode,
    checkIsLogined,
    userInfo,
    accessToken,
    setAccessToken,
    setUserInfo,
    setUserPanelShow,
    setLoginModalShow,
  };

  return (
    <Router>
      <div
        className={`music_festival_container ${
          isDarkMode ? "music_festival_container_dark" : ""
        }`}
      >
        <Provider value={contextValue}>
          <Fragment>
            <Navigator />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/lineUp" element={<LineUp />} />
              <Route exact path="/ticketOrder" element={<TicketOrder />} />
              <Route exact path="/map" element={<Map />} />
              <Route exact path="/shop" element={<Shop />} />
            </Routes>
            <Footer />

            {userInfo ? handleRenderUserPanel() : handleRenderLoginModal()}
          </Fragment>
        </Provider>
      </div>
    </Router>
  );
};
export default MusicFestivalIndex;
