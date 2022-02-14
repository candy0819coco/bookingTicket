import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./MyTicketList.scss";
import * as R from "ramda";
import context, { Provider } from "../context";
import axios from "axios";
import face from '../../image/membership_black.svg';

const MyTicketList = () => {
    const contextValue = useContext(context);
    const { handleGetTicketDetails,myTicketListDetailsShow } = contextValue;
    const [myTicketOrderList, setMyTicketOrderList] = useState([]);
    const [currentHoverTicketType, setCurrentHoverTicketType] = useState("");

    
    const handleGetTicketOrderList = async (e) => {
        console.log('post 取得票券訂單');
        let results;
          await axios({
            method: "post",
            url: `http://localhost:3400/ticket_order/get_list`,
            data: { mNo:"000008" },
            credentials: 'same-origin',
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then(function (response) {
              console.log("ticket_order_response", response.data.data);
              results = response.data.data;
              setMyTicketOrderList(results)
            })
            .catch((error) => {
              console.log('ticket_order_error', error)
            });
      };

    return (
        <div className={`member_order_container`}>
            <Provider value={contextValue}>
                <div id={"member_container"}>

                    <div className={"con_both con_left"}>
                        <div id={"member_hi"}>
                            <span>歡迎<br /><span>Guest</span></span>
                            <img src={face} />
                        </div>

                        <div id={"member_list"}>
                            {/* <!-- 這裡看怎麼改 --> */}

                            <div id={"member_list01"}>我的行程</div>
                            <div onClick={handleGetTicketOrderList} id={"member_list02"}> 我的票券 
                            </div>
                            <div id={"member_list03"}>我的訂單</div>
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

                        <table id={"order_list"}>
                            <thead>
                                <tr>
                                    <th>訂單日期</th>
                                    <th>訂單編號</th>
                                    <th>訂單狀態</th>
                                    <th>訂單金額</th>
                                    <th>付款方式</th>
                                    <th>付款狀態</th>
                                    <th>訂單明細</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myTicketOrderList.map((item, key)=>{
                             console.log('item', item);
                                return (
                                    <tr key={key}>
                                        <td>{item.orderTime}</td>
                                        <td>{item.orderNo}</td>
                                        <td>{item.orderStatus}</td>    
                                        <td>{item.orderPrice}</td>    
                                        <td>{item.paymentMethod}</td>
                                        <td>{item.paymentStatus}</td>
                                        <td>
                                        <div className ="btn_position">
                                          <div onClick={()=>handleGetTicketDetails(item.orderNo)} className="order_details_btn">+</div>
                                        </div>
                                      </td>
                                      </tr>               
                                )
                            })}
                            <div className={`${myTicketListDetailsShow ? "gray_square_show":""}`}></div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Provider>
        </div>
    );
};
export default MyTicketList;

