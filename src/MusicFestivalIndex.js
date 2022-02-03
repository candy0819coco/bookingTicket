import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./MusicFestivalIndex.scss";
import { Provider } from "./components/context.js";
import Navigator from "./components/Navigator/Navigator";
import ModalTool from "./components/ModalTool/ModalTool";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import TicketOrder from "./components/TicketOrder/TicketOrder";
import Payment from "./components/Payment/Payment";
import Shop from "./components/Shop/Shop";
import LineUp from "./components/LineUp/LineUp";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer"
import User from "./components/User/User"
import MemberOrder from "./components/MemberOrder/MemberOrder"
const MusicFestivalIndex = () => {
  const [pathName, setPathName] = useState("home");//依據不同pathName頁面，導覽列會不同
  const [isDarkMode, setIsDarkMode] = useState(false);
  const contextValue = { pathName, setPathName, isDarkMode, setIsDarkMode};//把會用到的值 裝在contextValue，傳給下面的組件使用
  return (
    <Router>
      <div className={`music_festival_container ${isDarkMode ? "music_festival_container_dark" : "" }`}>
        <Provider value={contextValue}>
          <Fragment>
              <Navigator/>
            <Routes>
              <Route exact path="/" element={<Payment />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/lineUp" element={<LineUp />} />
              <Route exact path="/ticketOrder" element={<TicketOrder />} />
              <Route exact path="/map" element={<Map />} />
              <Route exact path="/shop" element={<Shop />} />
              <Route exact path="/memberOrder" element={<MemberOrder />} />
              <Route exact path="/user" element={<User />} />
          </Routes>
            <Footer/>
          </Fragment>
        </Provider>
      </div>
    </Router>
  );
};
 export default MusicFestivalIndex;