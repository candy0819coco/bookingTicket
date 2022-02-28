import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./TicketOrder.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";
import Payment from "./../Payment/Payment";
import TicketPicker from "./../TicketPicker/TicketPicker";
import TicketOrderDetail from "./../TicketOrderDetail/TicketOrderDetail";
import CreditCardVerification from '../CreditCardVerification/CreditCardVerification';
import CampSitePicker from "./../CampSitePicker/CampSitePicker";
import ModalTool from "./../ModalTool/ModalTool";
import axios from "axios";
import moment from "moment";

const TicketOrder = () => {
  const [ticketOrderStep, setTicketOrderStep] = useState(0);
  const [wsState, setWsState] = useState();
  const [campSelectedList, setCampSelectedList] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [currentOrderNo,setCurrentOrderNo] =useState("");
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [campSitePickerShow, setCampSitePickerShow] = useState(false);
  const [pickedTicket, setPickedTicket] = useState([]);
  const [toDoSelectCamp, setToDoSelectCamp] = useState([]);
  const [testVerifyCode, setTestVerifyCode] = useState("");

  const contextValue = useContext(context);
  const { isDarkMode, currentUser } = contextValue;

  useEffect(() => {
    let ws = new WebSocket("ws://localhost:3400");
    console.log("ws", ws);
    setWsState(ws);
    ws.onopen = () => {
      console.log("open connection");
    };

    ws.onclose = () => {
      console.log("close connection");
    };

    ws.onmessage = (event) => {
      console.log("event", event);
      console.log("event.data", JSON.parse(event.data));
      setCampSelectedList(JSON.parse(event.data));
    };
  }, []);

  //重設票券
  const handleResetTicketOrder = () => {
    setTicketOrderStep(0);
    setPickedTicket([]);
  };


  useEffect(() => {
    let toDoSelectCampTicket = pickedTicket.filter((item)=> {return item.ticketType === "camp"})
    console.log('toDoSelectCampTicket', toDoSelectCampTicket);

    setToDoSelectCamp(toDoSelectCampTicket);
  }, [pickedTicket]);

  let orderTimeTest = moment(new Date().getTime()).locale("zh-tw").format(
    "YYYY-MM-DD HH:mm:ss"
    )
    console.log('orderTimeTest', orderTimeTest)

  const handleOrderTicket = async () => {
    // let orderTime = new Date().toLocaleString("zh-Tw", { hour12: false });
    let orderTime = moment(new Date().getTime()).locale("zh-tw").format(
      "YYYY-MM-DD HH:mm:ss"
    )
    console.log("orderTime", orderTime);
    let totalTickets = [
      { ticketType: "one", ticketName:"單日票",  campId: null, singleTicketDay: 1, ticketPrice: 1500, isActive:0, enterTime:null },
      { ticketType: "camp",ticketName:"露營票", campId: "B03", singleTicketDay: null, ticketPrice: 2500, isActive:0, enterTime:null },
    ];
    let result;
    let cardVerification = null;
    console.log('cardVerification', cardVerification)
    
    await axios({
      method: "post",
      url: `http://localhost:3400/ticket_order/add`,
      data: {
        userInfo: currentUser,
        totalTickets: pickedTicket,
        orderTime,
        orderStatus,
        orderPrice,
        paymentStatus,
        paymentMethod,
        cardVerification
      },
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log("create_ticket_order_response", response);
        result = response.data;
        setCurrentOrderNo(result.insertTicketOrderResults.insertId);
      })
      .catch((error) => {
        console.log("create_ticket_order_error", error);
        result = error;
      });
    return result;
  };


  const handleVisaCodeSend = async () => {
    let result;
    await axios({
      method: "post",
      url: `http://localhost:3400/ticketOrder/credit_card/send_code`,
      // data: {orderNo:currentOrderNo, currentUser:currentUser},
      data: {orderNo:"37", currentUser:currentUser},
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log("send_visa_code_response", response);
        result = response.data;
      })
      .catch((error) => {
        console.log("send_visa_code__error", error);
        result = error;
      });
    return result;
  };

  const handleVerifyVisaCode = async () => {
    let result;
    await axios({
      method: "post",
      url: `http://localhost:3400/ticketOrder/credit_card/check_code`,
      // data: {orderNo:currentOrderNo},
      data: {orderNo:"37",creditVerifyCode:testVerifyCode},
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log("verify_visa_code_response", response);
        result = response.data;
        console.log('result', result)
      })
      .catch((error) => {
        console.log("verify_visa_code__error", error);
        result = error;
      });
  };

  const handleRenderTicketOderStep = () => {
    if (ticketOrderStep === 0 || ticketOrderStep === 1) {
      return (
        <TicketPicker
        ticketOrderStep={ticketOrderStep}
          setTicketOrderStep={setTicketOrderStep}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setCampSitePickerShow={setCampSitePickerShow}
          pickedTicket={pickedTicket}
          setPickedTicket={setPickedTicket}
          handleResetTicketOrder={handleResetTicketOrder}
          campSelectedList={campSelectedList}
          toDoSelectCamp={toDoSelectCamp}
          setCampSelectedList={setCampSelectedList}
          
        />
      );
    } else if (ticketOrderStep === 2) {
      return (
        <Payment
          paymentMethod={paymentMethod}
          setTicketOrderStep={setTicketOrderStep}
          handleOrderTicket={handleOrderTicket}
          pickedTicket={pickedTicket}
          orderPrice={orderPrice}
          setOrderPrice={setOrderPrice}
          handleResetTicketOrder={handleResetTicketOrder}
          currentOrderNo={currentOrderNo}
        />
      );
    } else if (ticketOrderStep === 3) {
      return (
        <CreditCardVerification
          selectedTicketType={selectedTicketType}
          setTicketOrderStep={setTicketOrderStep}
          currentOrderNo={currentOrderNo}
          handleVisaCodeSend={handleVisaCodeSend}
        />
        // <TicketOrderDetail
        //   selectedTicketType={selectedTicketType}
        //   setTicketOrderStep={setTicketOrderStep}
        // />
      );
    } else {
    }
  };

  const handleRenderCampSitePicker = () => {
    return (
      <ModalTool
        modalShow={campSitePickerShow}
        modalCloseFunction={() => setCampSitePickerShow(false)}
        modalWidth={1200}
        modalHeight={700}
        backgroundOpacity={0.6}
        modalInnerBackground={`#fff`}
      >
        <CampSitePicker
          closeModal={() => setCampSitePickerShow(false)}
          pickedTicket={pickedTicket}
          campSelectedList={campSelectedList}
          setCampSelectedList={setCampSelectedList}
          wsState={wsState}
          toDoSelectCamp={toDoSelectCamp}
        />
      </ModalTool>
    );
  };

  return (
    <div
      className={`ticket_order_container ${
        isDarkMode ? "ticket_order_container_dark" : ""
      }`}
    >
      <div
        className={`ticket_order_title  ${
          isDarkMode ? "ticket_order_title_dark" : ""
        }`}
      ></div>
      <button onClick={handleOrderTicket}>模擬下訂單</button>
      <button onClick={handleVisaCodeSend}>模擬寄驗證</button>
      <button onClick={handleVerifyVisaCode}>模擬驗證交易碼</button>
      <input type="number" onChange={(e)=>setTestVerifyCode(e.target.value.toString())}></input>
      {handleRenderTicketOderStep()}
      {campSitePickerShow ? handleRenderCampSitePicker() : null}
    </div>
  );
};
export default TicketOrder;
