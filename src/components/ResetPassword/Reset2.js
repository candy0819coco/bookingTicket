import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import * as R from "ramda";
import context, { Provider } from "../context";
import "./Reset2.scss";

const Reset2 = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    // const navigate = useNavigate();

    return (
        <div className="reset2_container">
            <Provider value={contextValue}>
                <div className="now_location">
                    <span>首頁</span>
                    <span>/</span>
                    <span>會員</span>
                    <span>/</span>
                    <span>重置密碼</span>
                </div>
                <div className="reset_all">

                    <div className="reset_password">
                        <h1>重置密碼</h1>
                        <div className="reset_step">
                            <div className="reset_circle">1</div>
                            <div className="reset_line"></div>
                            <div className="reset_circle">2</div>
                            <div className="reset_line"></div>
                            <div className="reset_circle">3</div>
                        </div>
                        <div className="reset_insert">
                            <div className="resert_text">請輸入驗證碼</div>
                            <div className="reset_code">
                                <input type="text" className="inputItem1" maxlength="1" autoFocus/>
                                <input type="text" className="inputItem2" maxlength="1"/>
                                <input type="text" className="inputItem3" maxlength="1"/>
                                <input type="text" className="inputItem4" maxlength="1"/>
                                <input type="text" className="inputItem5" maxlength="1"/>
                                <input type="text" className="inputItem6" maxlength="1"/>
                            </div>
                            <div className="okButton">確認</div>
                        </div>


                    </div>
                </div>
            </Provider>
        </div>

    );
};
export default Reset2;
