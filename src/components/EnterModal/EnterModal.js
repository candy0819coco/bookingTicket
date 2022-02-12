import React, { Fragment, useEffect } from "react";
import "./EnterModal.scss";

const EnterModal = (props) => {
  const { show, close, action, sourcePage, popupWindow } = props;

  return (
    <div className="enter_button_container">
        <div className="enter_button">
          <div className="inner">
            <div className="text">BUY</div>
          </div>
        </div>
    </div>
  );
};

export default EnterModal;
