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

const TicketOrder = () => {
  const [ticketOrderStep, setTicketOrderStep] = useState(0);
  const [currentHoverTicketType, setCurrentHoverTicketType] = useState("");
  const contextValue = useContext(context);
  const {} = contextValue;

  return (
    <div className={`ticket_order_container`}>
      <Provider value={contextValue}>
        <div className="ticket_order">
          <div className="ticket_order_title"></div>
          <div className="ticket_type_area">
            <div
              className={`ticket_box ${
                currentHoverTicketType === "two" ||
                currentHoverTicketType === "camp"
                  ? "add_blank"
                  : ""
              }`}
            >
              <div
                className="ticket_image ticket_one_day"
                onMouseEnter={() => setCurrentHoverTicketType("one")}
                onMouseLeave={() => setCurrentHoverTicketType("")}
              >
                <div
                  className={`order_button ${
                    currentHoverTicketType === "one" ? "order_button_show" : ""
                  }`}
                >
                  BUY
                </div>
              </div>
              <div
                className={`ticket_info_area ${
                  currentHoverTicketType === "one" ? "area_show" : ""
                }`}
              >
                <div
                  className={`info_content ${
                    currentHoverTicketType === "one" ? "info_show" : ""
                  }`}
                >
                  {currentHoverTicketType === "one" ? (
                    <div className="content">one</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`ticket_box ${
                currentHoverTicketType === "camp" ? "add_blank" : ""
              }`}
            >
              <div
                className="ticket_image ticket_two_day"
                onMouseEnter={() => setCurrentHoverTicketType("two")}
                onMouseLeave={() => setCurrentHoverTicketType("")}
              >
                <div
                  className={`order_button ${
                    currentHoverTicketType === "two" ? "order_button_show" : ""
                  }`}
                >
                  BUY
                </div>
              </div>
              <div
                className={`ticket_info_area ${
                  currentHoverTicketType === "two" ? "area_show" : ""
                }`}
              >
                <div
                  className={`info_content ${
                    currentHoverTicketType === "two" ? "info_show" : ""
                  }`}
                >
                  {currentHoverTicketType === "two" ? (
                    <div className="content">two</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="ticket_box">
              <div
                className="ticket_image ticket_camp"
                onMouseEnter={() => setCurrentHoverTicketType("camp")}
                onMouseLeave={() => setCurrentHoverTicketType("")}
              >
                <div
                  className={`order_button ${
                    currentHoverTicketType === "camp" ? "order_button_show" : ""
                  }`}
                >
                  BUY
                </div>
              </div>
              <div
                className={`ticket_info_area ${
                  currentHoverTicketType === "camp" ? "area_show" : ""
                }`}
              >
                <div
                  className={`info_content ${
                    currentHoverTicketType === "camp" ? "info_show" : ""
                  }`}
                >
                  {currentHoverTicketType === "camp" ? (
                    <div className="content">camp</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};
export default TicketOrder;
