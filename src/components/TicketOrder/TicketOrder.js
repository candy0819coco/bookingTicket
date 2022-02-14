import React, { useState, useEffect, Fragment, useContext } from "react";
import "./TicketOrder.scss";
import context, { Provider } from "./../context";
import TicketOrderStepOne from "./../TicketOrderStepOne/TicketOrderStepOne";
import Payment from "./../Payment/Payment";
import TicketOrderDetail from "./../TicketOrderDetail/TicketOrderDetail";
import axios from "axios";

const TicketOrder = () => {
  const contextValue = useContext(context);
  const [wsState, setWsState] = useState();
  const [campSelectedList, setCampSelectedList] = useState([]);
  const [ticketOrderStep, setTicketOrderStep] = useState(0); //購買票的步驟
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [payment, setPayment] = useState("convenientStore");
  const { isDarkMode } = contextValue; //上層已經宣告，就只要寫這行
  console.log("ticketOrderStep", ticketOrderStep);


  useEffect(() => {
    let ws = new WebSocket("ws://localhost:3400");
    // let ws = new WebSocket("ws://localhost:5400");
    console.log('ws', ws)
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

  const handleChangePayment = () => {
    if (payment === "convenientStore") {
      setPayment("creditCard");
    } else {
      setPayment("convenientStore");
    }
  };


  const handleGetTicketByPost = async (e) => {
    console.log("post 取得付款明細");
    let orderTime = new Date().toLocaleString('zh-Tw', { hour12: false});
    console.log('orderTime', orderTime);
    let mName = "琴酒";
    let totalTickets = [
      { ticketType: "單日票", campId: null, singleTicketDay:1 },
      { ticketType: "雙日票(含露營)", campId: "B03", singleTicketDay:null }
    ];
    let result;
    await axios({
      method: "post",
      url: `http://localhost:3400/create_ticket_order`,
      data: { mNo: "000001", totalTickets: totalTickets, mName: mName, orderTime:orderTime },
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
          setTicketOrderStep={setTicketOrderStep}//為什麼要寫在這裡
          setSelectedTicketType={setSelectedTicketType}
        />
      );
    } else if (ticketOrderStep === 1) {
      return (
        <Payment
          payment={payment}
          setTicketOrderStep={setTicketOrderStep}
          handleChangePayment={handleChangePayment}
        />
      );
    } else if (ticketOrderStep === 2) {
      return (
        <TicketOrderDetail
          selectedTicketType={selectedTicketType}
          setTicketOrderStep={setTicketOrderStep}
        />
      );
    } else {
    }
  };
  //為什麼是傳setTicketOrderStep不是ticketOrderStep之類的 selectedTicketType setSelectedTicketType

  return (
    <div
      className={`ticket_order_container ${
        isDarkMode ? "ticket_order_container_dark" : ""
      }`}
    >
      <button onClick={handleGetTicketByPost}>模擬下訂單</button>
      {handleRenderTicketOderStep()}
      {/* //為什麼這行要這樣寫?單獨放在{}裡面就能做function */}
    </div>
  );
};
export default TicketOrder;
