import React, {
    useCallback,
    useState,
    useEffect,
    Fragment,
    useContext,
  } from "react";
  import "./PaymentIsOk.scss";
  import { Provider } from "../context";
  import * as R from "ramda";
  import context from "../context";

  const PaymentIsOk = (props) => {

      const contextValue = useContext(context);
      const { payment } = props;
      const { pathName, setPathName, isDarkMode, setIsDarkMode, ticketOrderStep } = contextValue;
      const handleRenderTicketOderStep = () => {
        if (ticketOrderStep === 1) {
          return <Payment payment={payment}/>;
        } else if(ticketOrderStep === 2) {
          return <PaymentIsOk />;//?
        } else{}
        }
      return(
        <div className={`payment_container`}>
        <Provider value={contextValue}>
          <div className={`payment`}>
            <div className={`payment_title`}></div>
            
            <div className={`payment_content_container`}>
              <div className={`payment_content_area`}>
                {/* <div className={`payment_type`}>超商繳費</div> */}
                <div className={`payment_info`}>
                  <div className={`info`}>繳費資訊</div>
                  <div className={`line`}></div>
                </div>
                <div className={`time_info`}>
                  <div className={`time_text`}>訂購時間</div>
                  <div className={`time`}>2022/02/04 14:03</div>
                </div>
                <div className={`take_ticket_info`}>
                  <div className={`take_ticket_text`}>取票編號</div>
                  <div className={`take_num`}>{`2890138`}</div>
                </div>
                <div className={`ticket_info`}>
                  <div className={`ticket_text`}票券資訊></div>
                  <div className={`type_plus_count`}>{`Love & Peace Rock Music Festival 單日票 X 1張`}</div>
                </div>
                <div className={`convenience_store_area`}>
                <div className={`icon icon`}></div>
                </div>
                <div className={`text_area`}>
                  票券一經兌換，不接受取消。
                  <br />
                  若因個人因素中途遲到、放棄行程，將不予退款，敬請留意。
                  <br />
                  (活動兩周前): 退票均酌收10%手續費 2022/08/2~2022/08/14
                  <br />
                  (活動前12天): 無法退款
                  <br />
                  Love & Peace Rock Festival活動主辦單位保有活動最終解釋權，所有活動、節目異動請詳Love & Peace Rock Festival官方訊息。
                  <br />
                </div>
                <div className={`submit_btn`}>
                  {handleRenderTicketOderStep()}                
                  {ticketOrderStep === 1 ? (
                    <div className="submit_content" onClick={() => setTicketOrderStep(2)}>送出</div>
                    ):(<div className="submit_content" onClick={() => setTicketOrderStep(1)}>上一步</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Provider>  
        </div>
      );
};
export default PaymentIsOk;
    






  