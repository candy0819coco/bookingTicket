import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./MemberOrder.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";
import face from '../../image/membership_black.svg';
import authService from '../../service/auth';//需要的引入

const MemberOrder = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        setCurrentUser(authService.getCurrentUser())
    }, []);//需要的引入


    const logOut = () => {
        localStorage.removeItem("user");
        window.location = "/";
    }

    return (
        <div className={`member_order_container`}>
            {!currentUser && ""}
            {currentUser &&
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
                                <div id={"member_list02"}>我的票券</div>
                                <div id={"member_list03"}>我的訂單</div>
                                <div id={"member_list04"}>帳號設定</div>

                            </div>

                            <div id={"member_logout"}>
                                <div onClick={logOut}>登出</div>
                            </div>
                            
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
                                        <th>訂單明細</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                    <tr>
                                        <td>20201231</td>
                                        <td>2012310001323</td>
                                        <td>已付款</td>
                                        <td>$2000</td>
                                        <td>放大鏡圖片</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Provider>
            }
        </div>

    );
};
export default MemberOrder;
