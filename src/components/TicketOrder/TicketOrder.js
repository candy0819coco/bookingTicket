import React, { useState, useEffect, Fragment, useContext } from "react";
import "./TicketOrder.scss";
import context, { Provider } from "./../context";
import TicketOrderStepOne from "./../TicketOrderStepOne/TicketOrderStepOne";
import Payment from "./../Payment/Payment";
import TicketOrderDetail from "./../TicketOrderDetail/TicketOrderDetail";

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

  const handleRenderTicketOderStep = () => {
    if (ticketOrderStep === 0) {
      return <TicketOrderStepOne setTicketOrderStep={setTicketOrderStep} setSelectedTicketType={setSelectedTicketType}/>;
    } else if (ticketOrderStep === 1) {
      return <Payment payment={payment} setTicketOrderStep={setTicketOrderStep} handleChangePayment={handleChangePayment} />;
    } else if (ticketOrderStep === 2) {
      return <TicketOrderDetail selectedTicketType={selectedTicketType} setTicketOrderStep={setTicketOrderStep}/>;
    } else {
    }
  };

  return (
    <div
      className={`ticket_order_container ${
        isDarkMode ? "ticket_order_container_dark" : ""
      }`}
    >
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
