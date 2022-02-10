import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./signIn.scss";
import * as R from "ramda";
import context, { Provider } from "../context";
import fb from '../../image/fb.svg';
import google from '../../image/google.svg';
import line from '../../image/line.svg';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";//跳轉頁面


const SignIn = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    const navigate = useNavigate()

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const goSignIn = (e) => {
        e.preventDefault();
        if (account != "" && password != "") {
            Axios.post("http://localhost:3001/signIn", {
                account: account,
                password: password
            }).then(function (res) {
                console.log(res);

                alert(res.data.message);
                if (res.data.token) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                // console.log(res.data.message);//顯示登入成功
                // navigate("/home");
            }).catch(function (err) {
                alert(err.response.data.message);
                // console.log(err.response);
            })
        } else if (account == "") {
            alert("請輸入帳號");
        } else {
            alert("請輸入密碼");
        }
    }



    return (
        <div className={`User_container`}>
            <Provider value={contextValue}>
                <div id={`now_location`}>
                    <span>首頁</span>
                    <span>/</span>
                    <span>會員</span>
                    <span>/</span>
                    <span>登入</span>
                </div>
                <div id={`sign_info`}>
                    <div>
                        <h1>會員登入</h1>
                    </div>

                    <div>
                        <div>

                            <label htmlFor="member_account">帳號</label>
                            <input type="text"
                                name="member_account"
                                id="member_account"
                                required
                                onChange={(e) => { setAccount(e.target.value) }} />


                            <label htmlFor="member_password">密碼</label>
                            <input
                                type="password"
                                name="member_password"
                                id="member_password"
                                required
                                onChange={(e) => { setPassword(e.target.value) }} />


                            <input
                                type="submit"
                                name="submit_info"
                                id="submit_info"
                                value="登入"
                                onClick={goSignIn} />
                        </div>
                    </div>
                    <div id={`join_member`}>
                        <p><a href="/register">加入會員</a></p>
                        <p>|</p>
                        <p><a href="/register/reset1">忘記密碼</a></p>
                    </div>


                    <div id="another_login">
                        <a href="#"><img src={fb} /></a>
                        <a href="#"><img src={google} /></a>
                        <a href="#"><img src={line} /></a>
                    </div>

                </div>

            </Provider>
        </div>
    );
};
export default SignIn;
