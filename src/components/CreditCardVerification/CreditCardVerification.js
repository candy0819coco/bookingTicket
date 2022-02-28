import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useRef,
  useContext,
currentUser
} from "react";
import "./CreditCardVerification.scss";
import context, { Provider } from "../context";
import  axios  from 'axios';


const CreditCardVerification = (props) => {
  const contextValue = useContext(context);
  // convenientStore creditCard
  const { paymentMethod, setTicketOrderStep, handleChangePayment, currentOrderNo, handleVisaCodeSend } = props; //屬性由TicketOrder傳來的props，在這支要補上這行程式碼
  const {myOrderNo} = contextValue;

  console.log('currentOrderNo', currentOrderNo)


  return (
    <div className={`credit_card_verification_container`}>
      <div className={`credit_card_verification`}>
        <div className={`verification_title`}></div>

        <div className={`verification_content_container`}>
          <div className={`verification_content_top`}>
              <div className={`visa_logo`}></div>
              <div className={`bank_logo`}></div>
          </div>
            <div className={`verification_content_middle`}>
                <div className={`shop_name_box`}>
                <div className={`shop_name_tilte`}>
                    店家名稱
                    </div>
                    <div className={`shop_name`}>
                    Love & Peace Rock Music Festival
                    </div>
                </div>
                <div className={`price_info`}>
                    <div className={`price_info_title`}>
                    交易金額
                    <div className={`price`}>TWD 1500</div>
                    </div>
                </div>
                <div className={`order_info`}>
                    <div className="buy_date">交易日期</div>
                    <div className={`time`}>2022/02/04 14:03</div>
                </div>
                <div className={`input_area`}>
                    <div className={`credit_card_number_title`}>交易卡號</div>
                    <div className={`credit_card_number`}>XXXX XXXX XXXX XXXX</div>
                </div>
                <button className={`autho_code`} onClick={handleVisaCodeSend}>
                    取得信箱傳送交易密碼
                </button>
            </div>
              <div className={`verification_content_last`}>
                <div className={`text_area`}>
                    注意事項
                    <br />
                    1.請點選「取得信箱傳送交易密碼」按鍵，本行將於1-2分鐘內以E-mail傳送動態交易碼。
                    <br />
                    2.請檢視E-mail已取得動態交易認證密碼並輸入送出
                    <br />
                    3.若你無法完成交易或是並未收到驗證碼，請與Love & Peace Rock
                    Festival客服中心聯絡
                </div>
              {/* <div className={`submit_btn`}>
                    <div className="submit_content">送出</div>
                  </div> */}
            
          </div>

          <div className={`btn_area`}>
            <button className="prev_step" onClick={() => setTicketOrderStep(2)}>
              上一步
            </button>
            <button className="next_step" onClick={() => setTicketOrderStep(0)}>
              確認
            </button>
            </div>
        </div>
      </div>
      
    </div>
  );
};
export default CreditCardVerification;
