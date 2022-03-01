import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./MusicFestivalIndex.scss";
import { Provider } from "./components/context.js";
import Navbar from "./components/navbar/Navbar";
import ModalTool from "./components/ModalTool/ModalTool";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import TicketOrder from "./components/TicketOrder/TicketOrder";
// import Shop from "./components/Shop/Shop";
// import LineUp from "./components/LineUp/LineUp";
// import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
// import User from "./components/User/User";
import MemberOrder from "./components/MemberOrder/MemberOrder";
import SignIn from "./components/signIn/signIn";
import Register from "./components/Register/Register";
import Reset1 from "./components/ResetPassword/Reset1";
import Reset2 from "./components/ResetPassword/Reset2";
import Reset3 from "./components/ResetPassword/Reset3";
import Jump from "./components/Jump/Jump";
// import MemberSchedule from "./components/MemberSchedule/MemberSchedule";
import MemberSetting from "./components/MemberSetting/MemberSetting";
import Google from "./components/Google/Google";
import Success from "./components/Register/Success";
// import Shop from "./components/Shop/Shop";
// import ItemPage from './components/ItemPage/ItemPage';

const MusicFestivalIndex = () => {
  const [pathName, setPathName] = useState("home");//依據不同pathName頁面，導覽列會不同
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState("");
  const contextValue = {
    pathName,
    setPathName,
    isDarkMode,
    setIsDarkMode,
    currentUser,
    setCurrentUser,
    userToken,
    setUserToken
  };//把會用到的值 裝在contextValue，傳給下面的組件使用


  const IsLogin = async () => {
    var userToken = localStorage.getItem("user") ? localStorage.getItem("user") : "";
    if (userToken) {
      await Axios.get("http://localhost:3001/check/signin", {
        headers: {
          "Authorization": userToken
        }
      })
        .then(function (res) {
          // console.log(res);
          if (res.data.statusCode === 200) {
            setCurrentUser(res.data.currentUser);
            setUserToken(userToken);
          } else {
            setCurrentUser();
            setUserToken("");
            console.log("token失效 請重新登入");
          }

          // console.log(currentUser);
        })
        .catch(function (err) {
          console.log(err);
        })
    } else {
      setCurrentUser();
      console.log("token失效 請重新登入");
      setUserToken("");
    }
  }

  useEffect(() => {
    IsLogin();
  }, [])


  return (
    <Router>
      <div className={`music_festival_container ${isDarkMode ? "music_festival_container_dark" : ""}`}>
        <Provider value={contextValue}>
          <Fragment>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              {/* <Route exact path="/lineUp" element={<LineUp />} /> */}
              <Route exact path="/ticketOrder" element={<TicketOrder />} />
              {/* <Route exact path="/map" element={<Map />} /> */}
              {/* <Route exact path="/shop" element={<Shop />} /> */}
              <Route exact path="/member/order" element={<MemberOrder />} />
              {/* <Route exact path="/member/schedule" element={<MemberSchedule />} /> */}
              <Route exact path="/member/setting" element={<MemberSetting />} />
              {/* <Route exact path="/user" element={<User />} /> */}
              <Route exact path="/signIn" element={<SignIn />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/register/success" element={<Success />} />
              <Route exact path="/register/reset1" element={<Reset1 />} />
              <Route exact path="/register/reset2" element={<Reset2 />} />
              <Route exact path="/register/reset3" element={<Reset3 />} />
              <Route path="/register/active/:mMail" element={<Jump />} />
              <Route path="/google/token/:token" element={<Google />} />
           
              {/* <Route path="/shop" element={<Shop />} />
              <Route path="/shop/itempage" element={<ItemPage />} /> */}

              {/* <Route path="/signIn/:token" element={<Home />} /> */}
            </Routes>
            <Footer />
          </Fragment>
        </Provider>
      </div>
    </Router>
  );
};
export default MusicFestivalIndex;