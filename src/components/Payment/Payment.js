import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Payment.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const Payment = () => {
  const contextValue = useContext(context);
  const { pathName, setPathName, isDarkMode, setIsDarkMode } = contextValue;

  return (
    <div className={`payment_container`}>
      <Provider value={contextValue}>
        <div className={`payment`}>
          <div className={`payment_title`}></div>
          <div className={`payment_content_container`}>
            <div className={`payment_content_area`}>
              <div className={`payment_type`}>超商繳費</div>
              <div className={`payment_info`}>
                <div className={`info`}>訂票資訊</div>
                <div className={`line`}></div>
                <div className={`order_info`}>
                  <div className={`time`}>#時間</div>
                  <div className={`type_plus_count`}>{`#種類 X #張數`}</div>
                </div>
              </div>
              <div className={`price_box`}>
                <div className={`price_title`}>總金額</div>
                <div className={`price_total`}>{`TWD #金額元`}</div>
              </div>
              <div className={`convenience_store_area`}>
                <div className={`icon icon`}></div>
              </div>
              <div className={`text_area`}>XXXXXXXXXXXXXXX</div>
              <div className={`submit_btn`}>送出</div>
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};
export default Payment;
