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
import TicketOrderStepOne from "./components/TicketOrderStepOne/TicketOrderStepOne";
import Payment from "./components/Payment/Payment";
import Shop from "./components/Shop/Shop";
import LineUp from "./components/LineUp/LineUp";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import User from "./components/User/User";
import MemberOrder from "./components/MemberOrder/MemberOrder";
import MyTicketList from "./components/MyTicketList/MyTicketList";
import Camp from "./components/Camp/Camp";
import TicketQrcode from "./components/TicketQrcode/TicketQrcode";
import TicketQrcodeContent from "./components/TicketQrcodeContent/TicketQrcodeContent";
import TicketPicker from "./components/TicketPicker/TicketPicker";

import axios from "axios";

const MusicFestivalIndex = () => {
  const [pathName, setPathName] = useState("home");//依據不同pathName頁面，去判斷導覽列current在哪裡
  const [isDarkMode, setIsDarkMode] = useState(false); //預設值是白天
  const [ticketOrderListDetails,setTicketOrderListDetails] = useState([]);

  const handleGetTicketDetails = async (orderNo) =>{
    console.log('handleGetTicketDetails_orderNo', orderNo)   
    let results;
    await axios({
      method:"post",
      url:`http://localhost:3400/ticket_details`,
      data:{orderNo:Number(orderNo)},//為什麼這樣寫  //依據orderNo去找到票券訂單細節
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log("ticket_details_response", response);
        results = response.data;
        console.log('ticket_details_results', results);
        setTicketOrderListDetails(results);
      })
      .catch((error) => {
        console.log("ticket_details_error", error);
        results = error;
      });
  }
      
  
  const contextValue = { pathName, setPathName, isDarkMode, setIsDarkMode, handleGetTicketDetails};//把會用到的值 裝在contextValue，傳給下面的組件使用

  return (
    <Router>
      <div className={`music_festival_container ${isDarkMode ? "music_festival_container_dark" : "" }`}>
        <Provider value={contextValue}>
          <Fragment>
              <Navigator/>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/lineUp" element={<LineUp />} />
              <Route exact path="/ticketOrder" element={<TicketOrder />} /> 
              <Route exact path="/map" element={<Camp />} />
              {/* <Route exact path="/myTicketList" element={<MyTicketList />} /> */}
              <Route exact path="/member/ticketOrder" element={<MyTicketList/>} />
              <Route exact path="/member/productOrder" element={<MemberOrder/>} />
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