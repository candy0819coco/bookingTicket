import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Payment.scss";
import TicketOrderStepOne from "./../TicketOrderStepOne/TicketOrderStepOne";
import PaymentIsOk from "./../PaymentIsOk/PaymentIsOk";
import * as R from "ramda";
import context, { Provider } from "./../context";

const Payment = (props) => {
  const contextValue = useContext(context);
  // convenientStore creditCard
  const { payment } = props;//屬性由TicketOrder(25行)傳來的，在這支要補上這行程式碼
  const { pathName, setPathName, isDarkMode, setIsDarkMode, ticketOrderStep, setTicketOrderStep } = contextValue;
    const [creditMonth, setCreditMonth] = useState("");
    const [creditYear, setCreditYear] = useState("");
    
    const monthList = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const yearList = ["2022","2023","2024","2025","2026","2027","2028"];

    useEffect(() => {
        let creditValid = creditMonth + "-" + creditYear;
        console.log('creditValid', creditValid);
    }, [creditMonth, creditYear]);

    const handleRenderTicketOderStep = () => {
      if (ticketOrderStep === 0) {
        return <TicketOrderStepOne />;
      } else if (ticketOrderStep === 1) {
        return <Payment payment={payment}/>;//?
      } else if(ticketOrderStep ===2){
        return <PaymentIsOk/>;
      }
      }


  return (
    <div className={`payment_container`}>
      <Provider value={contextValue}>
        <div className={`payment`}>
          <div className={`payment_title`}></div>
          
          <div className={`payment_content_container`}>
              {payment === "convenientStore" ? (
            <div className={`payment_content_area`}>
              <div className={`payment_type`}>超商繳費</div>
              <div className={`payment_info`}>
                <div className={`info`}>訂票資訊</div>
                <div className={`line`}></div>
              </div>
              <div className={`order_info`}>
                <div className={`time`}>2022/02/04 14:03</div>
                <div className={`type_plus_count`}>{`Love & Peace Rock Music Festival 單日票 X 1張`}</div>
              </div>
              <div className={`price_box`}>
                <div className={`price_title`}>總金額</div>
                <div className={`price_total`}>{`TWD 1500元`}</div>
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
               ) }
                </div>
            </div>):(<div>
                <div className={`payment_content_area`}>
              <div className={`payment_type`}>信用卡</div>
              <div className={`payment_info`}>
                <div className={`info`}>訂票資訊</div>
                <div className={`line`}></div>
              </div>
                <div className={`order_info`}>
                  <div className={`time`}>2022/02/04 14:03</div>
                  <div className={`type_plus_count`}>{`Love & Peace Rock Music Festival 單日票 X 1張`}</div>
                </div>
             
              <div className={`price_box`}>
                <div className={`price_title`}>總金額</div>
                <div className={`price_total`}>{`TWD 1500元`}</div>
              </div>
              <div className={`convenience_store_area`}>
                <div className={`credit_icon visa_icon`}></div>
                <div className={`credit_icon master_icon`}></div>
                <div className={`credit_icon jcb_icon`}></div>

              </div>
              <div className={`input_area`}>
                  <div className={`input_credit_card_icon`}></div>
                  <div className={`credit_card_account`}>
                    <form name="input" action="" method="post">
                        <input placeholder="" size ="4" maxLength="4"></input>
                        <input className={`account`}placeholder="" size ="4" maxLength="4"></input>
                        <input className={`account`}className={`account`}placeholder="" size ="4" maxLength="4"></input>
                        <input className={`account`}placeholder="" size ="4" maxLength="4"></input>
                        {/* //四個框框 ,自動跳*/}
                        {/* 首先 input 上都要給 maxLength，然後偵測輸入的長度等於 maxLength 就自動跳下一個*/}
                    </form>
                </div>
              </div>
              <div className={`credit_card_time_code`}>
                  <div className={`credit_card_time`}>
                  <select onChange={(e)=>setCreditMonth(e.target.value)}>
                    <option value="" disabled>MM</option>
                    {monthList.map((item, key)=>{
                        return (
                            <option value={item} key={key} >{item} </option>
                        )
                    })}
                  </select>/
                  <select onChange={(e)=>setCreditYear(e.target.value)}>
                  <option size="5" value="" disabled>YY</option>
                  {yearList.map((item, key)=>{
                        return (
                            <option size="5" value={item} key={key}>{item} </option>
                        )
                    })}
                  </select>
                  </div>
                  <div className={`credit_code`}>
                  <form name="input" action="" method="post">
                    <input type ="password" placeholder="授權碼" size="3" maxLength="3"></input>
                </form>
                  </div>
             </div>
              <div className={`text_area`}>
                   票券一經兌換，不接受取消。若因個人因素中途遲到、放棄行程，將不予退款，敬請留意。
                <br />
                (活動兩周前): 退票均酌收10%手續費 2022/08/2~2022/08/14
                <br />
                (活動前12天): 無法退款
                <br />
                Love & Peace Rock Festival活動主辦單位保有活動最終解釋權，所有活動、節目異動請詳Love & Peace Rock Festival官方訊息。
              </div>
              <div className={`submit_btn`}>
                <div className="submit_content">送出</div>
              </div>
            </div>
              </div>)}
          </div>
          
        </div>
      </Provider>
    </div>
  );
};
export default Payment;
