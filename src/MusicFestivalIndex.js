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
import ModalTool from "./components/ModalTool/ModalTool";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import TicketOrder from "./components/TicketOrder/TicketOrder";
import Shop from "./components/Shop/Shop";
import LineUp from "./components/LineUp/LineUp";
import Map from "./components/Map/Map";
const MusicFestivalIndex = () => {
  const [pathName, setPathName] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [isLogined, setIsLogined] = useState(true);
  const [sessionId, setSessionId] = useState("");
  console.log("userInfo", userInfo);

  const checkIsLogined = async () => {
    let currentSessionId = localStorage.getItem("festivalSessionId") ? localStorage.getItem("festivalSessionId") : "";
    console.log('currentSessionId', currentSessionId)

    let result;
    await axios({
      method: "get",
      url: `http://localhost:3400/is_logined?sessionId=${currentSessionId}`,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log("response", response);
        console.log("typeof response.data", typeof response.data);
        if (typeof response.data === "object") {
          result = JSON.parse(response.data.data);
          console.log("result", result);
          setUserInfo(result.userInfo);
          if (result.isLogined) {
            setIsLogined(result.isLogined);
            setSessionId(result.sessionId);
            localStorage.setItem("festivalSessionId", result.sessionId);
          } else {
            setIsLogined(false);
            setSessionId("");
          }
        } else {
          setUserInfo();
          setIsLogined(false);
          setSessionId("");
          localStorage.removeItem("festivalSessionId");
        }
      })
      .catch((error) => {
        console.log("checkIsLogined_error", error);
      });
    return result;
  };

  useEffect(() => {
    checkIsLogined();
  }, []);
  console.log('isLogined', isLogined)
  const contextValue = {
    pathName,
    setPathName,
    isDarkMode,
    setIsDarkMode,
    checkIsLogined,
    userInfo,
    isLogined,
    sessionId
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
          </Fragment>
        </Provider>
      </div>
    </Router>
  );
};
export default MusicFestivalIndex;
