import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import * as R from "ramda";
import context, { Provider } from "../context";
import "./Reset3.scss";

const Reset3 = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    // const navigate = useNavigate();

    return (
        <div className="reset3_container">
            <Provider value={contextValue}>
                <div className="now_location">
                    <span>首頁</span>
                    <span>/</span>
                    <span>會員</span>
                    <span>/</span>
                    <span>重置密碼</span>
                </div>
                <div className="reset_all">

                    <div className={"reset_password"}>
                        <h1>重置密碼</h1>
                        <div className="reset_step">
                            <div className="reset_circle">1</div>
                            <div className="reset_line"></div>
                            <div className="reset_circle">2</div>
                            <div className="reset_line"></div>
                            <div className="reset_circle">3</div>
                        </div>

                        <div className="reset_insert">
                            <label htmlFor="password"><div>請輸入新密碼</div></label>
                            <input type="text" id="password" />
                            <label htmlFor="password_confirm"><div>確認密碼</div></label>
                            <input type="text" id="password_confirm" />
                            
                            <button>寄送驗證碼</button>
                        </div>

                    </div>
                </div>
            </Provider>
        </div>

    );
};
export default Reset3;

