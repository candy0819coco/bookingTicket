import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useRef,
  useContext,
} from "react";
import "./Payment.scss";
import context, { Provider } from "./../context";
import * as R from "ramda";


const Payment = (props) => {
  const contextValue = useContext(context);
  // convenientStore creditCard
  const {
    paymentMethod,
    setTicketOrderStep,
    pickedTicket,
    handleOrderTicket,
    orderPrice,
    setOrderPrice,
    handleResetTicketOrder,
    currentOrderNo
  } = props;
  const [creditMonth, setCreditMonth] = useState("");
  const [creditYear, setCreditYear] = useState("");
  const {myOrderNo} = contextValue;

  
  console.log("pickedTicket", pickedTicket);
  const monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const yearList = ["2022", "2023", "2024", "2025", "2026", "2027", "2028"];
  
  const handleCalcTotalPrice = () => {
    let priceList = pickedTicket.map((item, index) => {
      return item.ticketPrice;
    });
    let tempPrice = R.sum(priceList);
    console.log('tempPrice', tempPrice)
    setOrderPrice(tempPrice);
  };

  useEffect(() => {
    handleCalcTotalPrice();
  }, []);


  useEffect(() => {
    let creditValid = creditMonth + "-" + creditYear;
    console.log("creditValid", creditValid);
  }, [creditMonth, creditYear]);

  const firstRef = useRef();
  const SecondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();
  const [myTicketOrderList, setMyTicketOrderList] = useState([]);
  const [creditNoFirst, setCreditNoFirst] = useState("");
  const [creditNoSecond, setCreditNoSecond] = useState("");
  const [creditNoThird, setCreditNoThird] = useState("");
  const [creditNoFourth, setCreditNoFourth] = useState("");
  const [creditNumber, setCreditNumber] = useState("")
  console.log('creditNumber', creditNumber) // 送去API

  const handleChangeCreditNumber = (inputValue, currentIndex) => {
    switch (currentIndex) {
      case 0:
        setCreditNoFirst(inputValue);
        if(inputValue.length === 4) SecondRef.current.focus();
        break;
      case 1:
        setCreditNoSecond(inputValue);
        if(inputValue.length === 4) thirdRef.current.focus();
        break;
      case 2:
        setCreditNoThird(inputValue);
        if(inputValue.length === 4) fourthRef.current.focus();
        break;
      case 3:
        setCreditNoFourth(inputValue);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let tempNumberArray = [];
    if(creditNoFirst.length === 4) {
      tempNumberArray[0] = creditNoFirst;
    } 
    if(creditNoSecond.length ===4) {
      tempNumberArray[1] = creditNoSecond;
    } 
    if(creditNoThird.length === 4) {
      tempNumberArray[2] = creditNoThird
    } 
    if(creditNoFourth.length === 4) {
      tempNumberArray[3] = creditNoFourth;
    } 
    console.log('tempNumberArray', tempNumberArray)
    setCreditNumber(tempNumberArray.join(""));
    
  }, [creditNoFirst, creditNoSecond, creditNoThird, creditNoFourth]);


  const handleConform = async() => {
    await handleOrderTicket();
    await setTicketOrderStep(3);
    await handleResetTicketOrder();
  };




  return (
    <div className={`payment_container`}>
      <div className={`payment`}>
        <div className={`payment_title`}></div>

        <div className={`payment_content_container`}>
          {paymentMethod === "convenientStore" ? (
            <div className={`payment_content_area`}>
              <div className={`payment_type`}>超商繳費</div>
              <div className={`payment_info`}>
                <div className={`info`}>訂票資訊</div>
                <div className={`line`}></div>
              </div>
              <div className={`order_info`}>
                <div className={`time`}>2022/02/04 14:03</div>
                <div
                  className={`type_plus_count`}
                >{`Love & Peace Rock Music Festival 單日票 X 1張`}</div>
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
                Love & Peace Rock
                Festival活動主辦單位保有活動最終解釋權，所有活動、節目異動請詳Love
                & Peace Rock Festival官方訊息。
                <br />
              </div>
            </div>
          ) : (
            <div>
              <div className={`payment_content_area`}>
                <div className={`payment_type`}>信用卡</div>
                <div className={`payment_info`}>
                  <div className={`info`}>訂票資訊</div>
                  <div className={`line`}></div>
                </div>
                <div className={`order_info`}>
                  <div className={`time`}>2022/02/04 14:03</div>
                  <div
                    className={`type_plus_count`}
                  >{`Love & Peace Rock Music Festival 單日票 X 1張`}</div>
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
                  <div className={`credit_card_number`}>
                      <input
                        className={`number_input ${creditNoFirst.length && creditNoFirst.length!==4?"notice":""}`}
                        placeholder="4155"
                        size="4"
                        type="number"
                        maxLength="4"
                        ref={firstRef}
                        onChange={(e)=>handleChangeCreditNumber(e.target.value, 0)}
                      ></input>
                      <input
                        className={`number_input ${creditNoSecond.length && creditNoSecond.length!==4?"notice":""}`}
                        placeholder="6352"
                        size="4"
                        type="number"
                        maxLength="4"
                        ref={SecondRef}
                        onChange={(e)=>handleChangeCreditNumber(e.target.value, 1)}
                      ></input>
                      <input
                        className={`number_input ${creditNoThird.length && creditNoThird.length!==4?"notice":""}`}
                        placeholder="0652"
                        size="4"
                        type="number"
                        maxLength="4"
                        ref={thirdRef}
                        onChange={(e)=>handleChangeCreditNumber(e.target.value, 2)}
                      ></input>
                      <input
                        className={`number_input ${creditNoFourth.length && creditNoFourth.length!==4?"notice":""}`}
                        placeholder="4523"
                        size="4"
                        type="number"
                        maxLength="4"
                        ref={fourthRef}
                        onChange={(e)=>handleChangeCreditNumber(e.target.value, 3)}
                      ></input>
                      {/* //四個框框 ,自動跳*/}
                      {/* 首先 input 上都要給 maxLength，然後偵測輸入的長度等於 maxLength 就自動跳下一個*/}

                  </div>
                </div>
                <div className={`credit_card_time_code`}>
                  <div className={`credit_card_time`}>
                    <select onChange={(e) => setCreditMonth(e.target.value)}>
                      <option value="" disabled>
                        MM
                      </option>
                      {monthList.map((item, key) => {
                        return (
                          <option value={item} key={key}>
                            {item}{" "}
                          </option>
                        );
                      })}
                    </select>
                    /
                    <select onChange={(e) => setCreditYear(e.target.value)}>
                      <option size="5" value="" disabled>
                        YY
                      </option>
                      {yearList.map((item, key) => {
                        return (
                          <option size="5" value={item} key={key}>
                            {item}{" "}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className={`credit_code`}>
                    <form name="input" action="" method="post">
                      <input
                        type="password"
                        placeholder="授權碼"
                        size="3"
                        maxLength="3"
                      ></input>
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
                  Love & Peace Rock
                  Festival活動主辦單位保有活動最終解釋權，所有活動、節目異動請詳Love
                  & Peace Rock Festival官方訊息。
                </div>
                {/* <div className={`submit_btn`}>
                  <div className="submit_content">送出</div>
                </div> */}
              </div>
            </div>
          )}
          <div className={`btn_area`}>
            <button className="prev_step" onClick={() => setTicketOrderStep(1)}>
              上一步
            </button>
            <button className="next_step" onClick={() => setTicketOrderStep(3)}>
              確認
            </button>
            {/* <button
              className="temp_payment_switch_btn"
              onClick={handleChangePayment}
            >
              現在是{payment}，切換付款方式
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;


