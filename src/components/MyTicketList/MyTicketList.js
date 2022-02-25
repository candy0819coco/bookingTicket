import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./MyTicketList.scss";
import * as R from "ramda";
import context, { Provider } from "../context";
import axios from "axios";
import face from "../../image/membership_black.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TicketQrcode from "../TicketQrcode/TicketQrcode";
import TicketQrcodeContent from "../TicketQrcodeContent/TicketQrcodeContent";
import QRCode from "react-qr-code";

const MyTicketList = () => {
  const contextValue = useContext(context);
  const {
    handleGetTicketDetails,
    ticketOrderListDetails,
      currentUser,
      setTicketOrderListDetails,
  } = contextValue;
  const [myTicketOrderList, setMyTicketOrderList] = useState([]);
  const [myTicketListDetailsShow, setMyTicketListDetailsShow] = useState(false);
  const [ticketQrCodeShow, setTicketQrCodeShow] = useState(false); //預設不顯示
  const [ticketQrCodeIndex, setTicketQrCodeIndex] = useState(0);
  const [ticketOrderIndex, setTicketOrderIndex] = useState(0);
  const [currentTicketItem, setCurrentTicketItem] = useState();
  const [currentTicketOrderItem, setCurrentTicketOrderItem] = useState();
  const [ticketsOfCurrentOrder, setTicketsOfCurrentOrder] = useState([]);
  const [currentTicketOrder, setCurrentTicketOrder] = useState([]);
  const [userPathName,setUserPathName] = useState("memberOrder");
  const [showDetailList, setShowDetailList] = useState([]);

  const handleCloseTicketQrCode = (e) => {
    setTicketQrCodeShow(false);
    e.stopPropagation();
    setCurrentTicketItem();
    setTicketsOfCurrentOrder([]);
  };
  const handleGetTicketOrderList = async (e) => {
    console.log("post 取得票券訂單");
    let results;
    await axios({
      method: "post",
      url: `http://localhost:3400/ticket_order/get_list`,
      data: {mNo:"000001"},//  data: {mNo:currentUser.mNo},

      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log('responsewhat',response.data)
        console.log("ticket_order_response", response.data.data); //?
        results = response.data.data;
        setMyTicketOrderList(results);
      })
      .catch((error) => {
        console.log("ticket_order_error", error);
      });
  };

  const handleGetTicketQrcode = async (e) => {
    console.log("get 取得票券QRcode");
    let results;
    console.log('currentTicketItem', currentTicketItem)
    console.log('currentTicketItem.ticketNo', currentTicketItem.ticketNo)

    await axios({
      method: "get",
      url: `http://192.168.96.108:3400/ticket_order/get_qrcode?ticketNo=${currentTicketItem.ticketNo}`,
      // data: { mNo:"000008" }, get方法沒有這個東西
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log('ticket_qrcode_response', response)
      })
      .catch((error) => {
        console.log("ticket_qrcode_error", error);
      });
  };

  const handleOpenQrcode = (indexResult, ticketsItem, allTickets) => {
    setTicketQrCodeShow(true);
    setTicketQrCodeIndex(indexResult);
    console.log(indexResult);
    setCurrentTicketItem(ticketsItem);
    setTicketsOfCurrentOrder(allTickets);
  };
//   const handOpenTicketList=(e)=>{
//       setMyTicketListDetailsShow(!myTicketListDetailsShow);

//  }

  useEffect(() => {
    handleGetTicketOrderList();
  }, []);
  
  const handleUserPathName =(props)=>{
    setUserPathName(props);
    // return <props/>
  }

  const handleShowDetail = (orderNo) => {
    console.log('orderNo', orderNo)
    let tempList = [...showDetailList];
    console.log('0_tempList', tempList)
    // let targetDetail = document.getElementById(orderNo);
    // console.log('targetDetail', targetDetail);
    // targetDetail.style.height = "160px";
    if(R.includes(orderNo, showDetailList)) {
      tempList = R.without([orderNo], showDetailList);
      console.log('1_tempList', tempList)
      setShowDetailList(tempList);
    } else {
      tempList = [...showDetailList];
      tempList.push(orderNo);
      console.log('2_tempList', tempList)
      setShowDetailList(tempList);

    }

  }



  return (
    <div className={`ticket_order_container`}>
      {/* {!currentUser && ""} */}
      {/* {currentUser && */}

        <div id={"member_container"}>
          <div className={"con_both con_left"}>
            <div id={"member_hi"}>
              <span>
                歡迎
                <br />
                <span>Guest</span>
              </span>
              <img src={face} />
            </div>
            
            <div id={"member_list"}>
              {/* <!-- 這裡看怎麼改 --> */}

              <div id={"member_list01"}>我的行程</div>
              <div>
              <Link id={`member_list02 ${userPathName === "MyTicketList" ? "current" : ""}`} to="/member/ticketOrder" onClick={()=>handleUserPathName("MyTicketList")}>我的票券</Link>
              </div>
              <div>
              <Link id={`member_list03 ${userPathName === "memberOrder" ? "current" : ""}`} to="/member/productOrder" onClick={()=>handleUserPathName('memberOrder')}>我的訂單</Link>
              </div>
              
              <div id={"member_list04"}>帳號設定</div>
            </div>

            <button id={"member_logout"}>登出</button>
          </div>

          <div className={"con_both con_right"}>
            <div id={"now_location"}>
              <span>首頁</span>
              <span>/</span>
              <span>會員</span>
              <span>/</span>
              <span>登入</span>
            </div>
            <div className={`order_list`}>
              <div className={`thead_area`}>
                <div className={`tr_area`}>
                  <div className="th_area">訂單日期</div>
                  <div className="th_area">訂單編號</div>
                  {/* <div className="th_area">訂單狀態</div> */}
                  <div className="th_area">訂單金額</div>
                  <div className="th_area">付款方式</div>
                  <div className="th_area">付款狀態</div>
                  <div className="th_area">訂單明細</div>
                </div>
              </div>
              {myTicketOrderList.map((item, itemOrderNo) => {
                console.log("item", item);
                return (
                  <Fragment key={itemOrderNo}>
                    <div className={`thead_second_area`}>
                      <div className={`tr_second_area ${itemOrderNo%2===0 ? "odd_row":"even_row"}`}>
                        <div className={`tb_area `}>{item.orderTime}</div>
                        <div className={`tb_area`}>{item.orderNo}</div>
                        {/* <div className="tb_area">{item.orderStatus === 1 ? "訂單成立":"尚未成立"}</div> */}
                        <div className={`tb_area `}>{item.orderPrice}</div>
                        <div className={`tb_area`}>{item.paymentMethod}</div>
                        <div className={`tb_area `}>
                          {item.paymentStatus === 1 ? "付款完成" : "未付款"}
                        </div>
                        <div className="tb_area">
                          <div className="btn_position">
                            <div
                              // onClick={()=>setMyTicketListDetailsShow(!myTicketListDetailsShow)}
                              onClick={()=>handleShowDetail(item.orderNo)}
                              className="order_details_btn "
                            >
                              {R.includes(item.orderNo, showDetailList) ? "+":"-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`gray_square ${
                        !R.includes(item.orderNo, showDetailList) ? "gray_square_show" : ""
                      }`}
                    >
                      <div className="gray_square_content">
                        <div className="gray_square_title_area">
                          <div className="gray_square_title">{`票券號碼`}</div>
                          <div className="gray_square_title">{`活動日期`}</div>
                          <div className="gray_square_title">{`票券種類`}</div>
                          <div className="gray_square_title">{`票券金額`}</div>
                          <div className="gray_square_title e_vocher">{`電子票券憑證`}</div>
                        </div>
                        {item.tickets.map((ticketsItem, key) => {
                          return (
                            <div className="map_area" key={key}>
                              <div className="gray_square_details_area">
                              <div className="type_color_area">
                                  <div
                                    className={`blank ${
                                      ticketsItem.ticketType == "two"
                                        ? "two_days_color"
                                        : ticketsItem.ticketType == "one"
                                        ? "single_color"
                                        : "camp_color"
                                    }`}
                                  ></div>
                                  <div className={`gray_square_details_one`}>
                                    {ticketsItem.ticketNo}
                                  </div>
                                </div>
                                <div className={`gray_square_details`}>
                                  {ticketsItem.ticketType === "one"
                                    ? ticketsItem.singleTicketDay === 1
                                      ? "20220813"
                                      : "20220814"
                                    : "20220813\n20220814"}
                                </div>
                                <div className={`gray_square_details`}>
                                  {ticketsItem.ticketName}
                                  {ticketsItem.ticketName==='露營票'
                                  ?
                                  (<div className={`camp_site`}>
                                    <div className={`camp_site_name`}>{ticketsItem.campId}</div>
                                  </div>
                                  ):""}

                                  {/* <div className={`active_day`}>8/13</div> */}
                                </div>
                                <div className={`gray_square_details`}>
                                  {ticketsItem.ticketPrice}
                                </div>
                                <div className={`gray_square_details e_vocher`}>
                                  <div
                                    onClick={() =>
                                      handleOpenQrcode(key, ticketsItem, item.tickets)
                                    }
                                    className="view_area"
                                  >
                                    查看
                                  </div>
                                </div>
                              </div>
                              <div className="detail_line"></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Fragment>
                );
              })}
              {currentTicketItem ? (
                <TicketQrcode
                  modalShow={ticketQrCodeShow}
                  modalCloseFunction={handleCloseTicketQrCode}
                  modalWidth={406}
                  modalHeight={880}
                  backgroundOpacity={0.9}
                  modalInnerBackground={`#fff`}
                >
                  <TicketQrcodeContent
                    closeModal={handleCloseTicketQrCode}
                    ticketQrCodeIndex={ticketQrCodeIndex}
                    currentTicketItem={currentTicketItem}
                    ticketsOfCurrentOrder={ticketsOfCurrentOrder}
                    setCurrentTicketItem={setCurrentTicketItem}
                    setTicketQrCodeIndex={setTicketQrCodeIndex}
                    handleGetTicketQrcode={handleGetTicketQrcode}
                  />
                </TicketQrcode>
              ) : null}
            </div>
          </div>
        </div>
      
    </div>
  );
};
export default MyTicketList;
