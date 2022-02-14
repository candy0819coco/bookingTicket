import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./UserPanelContent.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const UserPanelContent = (props) => {
  const contextValue = useContext(context);
  const { isDarkMode, setPathName } = contextValue;
  const {
    closeModal,
    modalShow,
    modalCloseFunction,
    modalWidth,
    modalHeight,
    backgroundOpacity,
    modalInnerBackground,
  } = props;

  return (
    <div className={`user_panel_content_container`}>
      <div className={`user_panel_content`}>
        <div className={`panel_item`}>
          <div className={`icon_text_area`}>
            <div className={`icon icon_member`}></div>
            <div className="text">
              我的會員
              <div className="arrow"></div>
            </div>
          </div>
        </div>
        <div className={`panel_item`}>
          <div className={`icon_text_area`}>
            <div className={`icon icon_order`}></div>
            <div className="text">
              <Link
                className={`my_ticket_order_link`}
                to="/myTicketList"
                onClick={() => setPathName("myTicketList")}
              >
                我的票券訂單
              </Link>
              <div className="arrow"></div>
            </div>
          </div>
        </div>

        <div className={`panel_item`}>
          <div className={`icon icon_ticket`}></div>
          <div className="count"></div>
        </div>
      </div>
    </div>
  );
};
export default UserPanelContent;
