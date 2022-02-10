import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./UserPanelContent.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const UserPanelContent = (props) => {
    const contextValue = useContext(context);
    const { isDarkMode} = contextValue;
    const {
        closeModal,
        modalShow,
        modalCloseFunction,
        modalWidth,
        modalHeight,
        backgroundOpacity,
        modalInnerBackground} = props;

    return (
        <div className={`user_panel_content_container`}>
            <Provider value={contextValue}>
                <div className={`user_panel_content`}>
                    <div className={`panel_item`}>
                        <div className={`icon_text_area`}>
                        <div className={`icon icon_member`}>
                        </div>
                        <div className="text">我的會員</div>
                        <div className="arrow"></div>
                    </div>
                </div>
                <div className={`panel_item`}>
                    <div className={`icon_text_area`}>
                        <div className={`icon icon_order`}>
                        </div>
                        <div className="text">我的訂單</div>
                        <div className="arrow"></div>
                    </div>
                </div>

                <div className={`panel_item`}>
                    <div className={`icon icon_ticket`}>
                    </div>
                    <div className="count"></div>
                </div>
            </div>
            </Provider>
        </div>
    );
};
export default UserPanelContent;
