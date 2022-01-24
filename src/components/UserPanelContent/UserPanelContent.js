import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
  Suspense,
} from "react";
import "./UserPanelContent.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "../context";

const UserPanelContent = (props) => {
  const contextValue = useContext(context);
  const { isDarkMode } = contextValue;
  const { closeModal } = props;

  return (
    <div className={`user_panel_content_container`}>
      <Provider value={contextValue}>
        <div className={`user_panel_content ${isDarkMode ? "user_panel_content_dark" : ""}`}>
          {/* <div className="close_btn" onClick={closeModal}></div> */}
          <div className={`panel_item ${isDarkMode ? "panel_item_dark" : ""}`}>
            <div
              className={`icon icon_member ${isDarkMode ? "icon_member_dark" : ""}`}
            ></div>
            <div className="text">會員資料</div>
          </div>
          <div className={`panel_item ${isDarkMode ? "panel_item_dark" : ""}`}>
            <div
              className={`icon icon_products ${isDarkMode ? "icon_products_dark" : ""}`}
            ></div>
            <div className="text">商品訂單</div>
          </div>
          <div className={`panel_item ${isDarkMode ? "panel_item_dark" : ""}`}>
            <div
              className={`icon icon_tickets ${isDarkMode ? "icon_tickets_dark" : ""}`}
            ></div>
            <div className="text">票券訂單</div>
          </div>
        </div>
      </Provider>
    </div>
  );
};
export default UserPanelContent;
