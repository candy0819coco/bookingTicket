import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
  Suspense,
} from "react";
import "./UserPanelContent.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";
import Logout from "./../Logout/Logout";

const UserPanelContent = (props) => {
  const contextValue = useContext(context);
  const { isDarkMode, isLogined } = contextValue;
  const { closeModal } = props;

  return (
    <div className={`user_panel_content_container`}>
        <div
          className={`user_panel_content ${
            isDarkMode ? "user_panel_content_dark" : ""
          }`}
        >
          {/* <div className="close_btn" onClick={closeModal}></div> */}
          <div className={`panel_item ${isDarkMode ? "panel_item_dark" : ""}`}>
            <div
              className={`icon icon_member ${
                isDarkMode ? "icon_member_dark" : ""
              }`}
            ></div>
            <div className="text">會員資料</div>
          </div>
          <div className={`panel_item ${isDarkMode ? "panel_item_dark" : ""}`}>
            <div
              className={`icon icon_products ${
                isDarkMode ? "icon_products_dark" : ""
              }`}
            ></div>
            <div className="text">商品訂單</div>
          </div>
          <div className={`panel_item ${isDarkMode ? "panel_item_dark" : ""}`}>
            <div
              className={`icon icon_tickets ${
                isDarkMode ? "icon_tickets_dark" : ""
              }`}
            ></div>
            <div className="text">票券訂單</div>
          </div>
          {isLogined ? (
            <div
              className={`panel_item item_logout ${
                isDarkMode ? "panel_item_dark" : ""
              }`}
            >
              {/* <div
              className={`icon icon_tickets ${isDarkMode ? "icon_tickets_dark" : ""}`}
            ></div> */}
              <Logout closeModal={closeModal} />
            </div>
          ) : null}
        </div>
    </div>
  );
};
export default UserPanelContent;
