import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import * as R from "ramda";
import context, { Provider } from "../context";
import "./Reset1.scss";

const Reset1 = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    // const navigate = useNavigate();

    return (
        <div className="reset1_container">
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
                            <div>Email</div>
                            <input type="text" name="" id="" />
                            {/* <input type="button" value="Send Verification Code" /> */}
                            <button>寄送驗證碼</button>
                        </div>

                    </div>
                </div>
            </Provider>
        </div>

    );
};
export default Reset1;

