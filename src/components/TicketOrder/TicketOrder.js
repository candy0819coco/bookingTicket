import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./TicketOrder.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";
import TicketOrderStepOne from "./../TicketOrderStepOne/TicketOrderStepOne";
import Payment from "./../Payment/Payment";
import PaymentIsOk from "./../PaymentIsOk/PaymentIsOk";

const TicketOrder = () => {        
  const contextValue = useContext(context);  
  const [ticketOrderStep, setTicketOrderStep] = useState(0); //購買票的步驟
  const [payment, setPayment] = useState("convenientStore");
  const { isDarkMode } = contextValue;//上層已經宣告，就只要寫這行
  console.log("ticketOrderStep", ticketOrderStep);

  const handleRenderTicketOderStep = () => {
    if (ticketOrderStep === 0) {
      return <TicketOrderStepOne />;
    } else if (ticketOrderStep === 1) {
      return <Payment payment={payment}/>;
    } else if(ticketOrderStep === 2){
      return <PaymentIsOk/>;
    }else{}
    }
  ;

    const handleChangePayment = () => {
      if(payment === "convenientStore") {
        setPayment("creditCard");
      } else {
        setPayment("convenientStore");
      };
  
  return (
    <div
      className={`ticket_order_container ${
        isDarkMode ? "ticket_order_container_dark" : ""
      }`}
    >
      <Provider value={contextValue}>  
        {handleRenderTicketOderStep()} {/*為什麼這行要這樣寫?單獨放在{}裡面就能做function */}
        {ticketOrderStep === 0 ? (
          <button onClick={() => setTicketOrderStep(1)}>下一步</button>
        ):(
          <button onClick={() => setTicketOrderStep(0)}>上一步</button>
        ) }
        <button onClick={handleChangePayment}>現在是{payment}，切換付款方式</button> 
      </Provider>
    </div>
  );
 }
};
export default TicketOrder;
