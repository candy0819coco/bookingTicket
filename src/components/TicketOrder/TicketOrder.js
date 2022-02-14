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
import TicketOrderStepOne from "./../TicketOrderStepOne/TicketOrderStepOne";
import Payment from "./../Payment/Payment";
import TicketPicker from "./../TicketPicker/TicketPicker";
import TicketOrderSuccess from "./../TicketOrderSuccess/TicketOrderSuccess";
import CampSitePicker from "./../CampSitePicker/CampSitePicker";
import ModalTool from "./../ModalTool/ModalTool";
import axios from "axios";

const TicketOrder = () => {
  const [ticketOrderStep, setTicketOrderStep] = useState(0);
  const [wsState, setWsState] = useState();
  const [campSelectedList, setCampSelectedList] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [campSitePickerShow, setCampSitePickerShow] = useState(false);
  const [pickedTicket, setPickedTicket] = useState([]);
  const [toDoSelectCamp, setToDoSelectCamp] = useState([]);
  const contextValue = useContext(context);
  const { isDarkMode, userInfo } = contextValue;

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


  const handleResetTicketOrder = () => {
    setTicketOrderStep(0)
  };


  useEffect(() => {
    let toDoSelectCampTicket = pickedTicket.filter((item)=> {return item.ticketType === "camp"})
    console.log('toDoSelectCampTicket', toDoSelectCampTicket);
    setToDoSelectCamp(toDoSelectCampTicket);
  }, [pickedTicket]);

  const handleOrderTicket = async () => {
    let orderTime = new Date().toLocaleString("zh-Tw", { hour12: false });
    console.log("orderTime", orderTime);
    let totalTickets = [
      { ticketType: "one", campId: null, singleTicketDay: 1 },
      { ticketType: "camp", campId: "B03", singleTicketDay: null },
    ];
    let result;
    await axios({
      method: "post",
      url: `http://localhost:3400/ticket_order/add`,
      data: {
        userInfo: userInfo,
        totalTickets: totalTickets,
        orderTime,
        orderStatus,
        orderPrice,
        paymentStatus,
        paymentMethod,
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
      })
      .catch((error) => {
        console.log("create_ticket_order_error", error);
        result = error;
      });
    return result;
  };

  const handleRenderTicketOderStep = () => {
    if (ticketOrderStep === 0) {
      return (
        <TicketOrderStepOne
          setTicketOrderStep={setTicketOrderStep}
          setSelectedTicketType={setSelectedTicketType}
        />
      );
    } else if (ticketOrderStep === 1) {
      return (
        <TicketPicker
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
        />
      );
    } else if (ticketOrderStep === 3) {
      return (
        <TicketOrderSuccess
          selectedTicketType={selectedTicketType}
          setTicketOrderStep={setTicketOrderStep}
        />
      );
    } else {
    }
  };

  const handleRenderCampSitePicker = () => {
    return (
      <ModalTool
        modalShow={campSitePickerShow}
        modalCloseFunction={() => setCampSitePickerShow(false)}
        modalWidth={"80%"}
        modalHeight={"80%"}
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
      {/* <button onClick={handleOrderTicket}>模擬下訂單</button> */}
      {handleRenderTicketOderStep()}
      {campSitePickerShow ? handleRenderCampSitePicker() : null}
    </div>
  );
};
export default TicketOrder;
