import React, { useState, useEffect, Fragment, useContext } from "react";
import "./TicketOrder.scss";
import context, { Provider } from "./../context";
import TicketOrderStepOne from "./../TicketOrderStepOne/TicketOrderStepOne";
import Payment from "./../Payment/Payment";
import TicketOrderDetail from "./../TicketOrderDetail/TicketOrderDetail";
import axios from "axios";

const TicketOrder = () => {
  const contextValue = useContext(context);
  const [ticketOrderStep, setTicketOrderStep] = useState(0); //購買票的步驟
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [payment, setPayment] = useState("convenientStore");
  const { isDarkMode } = contextValue; //上層已經宣告，就只要寫這行
  console.log("ticketOrderStep", ticketOrderStep);

  const handleChangePayment = () => {
    if (payment === "convenientStore") {
      setPayment("creditCard");
    } else {
      setPayment("convenientStore");
    }
  };

  const handleGetTicketByPost = async (e) => {
    console.log("post 取得付款明細");
    let orderTime = new Date();
    let mName = "琴酒";
    let totalTickets = [
      { ticketType: "one", campId: null, singleTicketDay:1 },
      { ticketType: "two", campId: null, singleTicketDay:null },
      { ticketType: "camp", campId: "A-01", singleTicketDay:null },
      { ticketType: "camp", campId: "B-03", singleTicketDay:null }
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
          setTicketOrderStep={setTicketOrderStep}
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
      {/* <div className="btn_area">
        {ticketOrderStep === 0 ? (
          <button className="next_step" onClick={() => setTicketOrderStep(1)}>
            下一步
          </button>
        ) : ticketOrderStep === 1 ? (
          <Fragment>
            <button className="prev_step" onClick={() => setTicketOrderStep(0)}>
              上一步
            </button>
            <button className="next_step" onClick={() => setTicketOrderStep(2)}>
              下一步
            </button>
          </Fragment>
        ) : (
          <button className="prev_step" onClick={() => setTicketOrderStep(1)}>
            上一步
          </button>
        )}
        <button
          className="temp_payment_switch_btn"
          onClick={handleChangePayment}
        >
          現在是{payment}，切換付款方式
        </button>
      </div> */}
    </div>
  );
};
export default TicketOrder;
