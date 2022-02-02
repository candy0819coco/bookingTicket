import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./signIn.scss";
import * as R from "ramda";
import context, { Provider } from "../context";
import fb from '../../image/fb.svg';
import google from '../../image/google.svg';
import line from '../../image/line.svg';
import Axios from 'axios';

const SignIn = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const goSignIn = () => {

        // if (username != "" && password != "") {
        //     Axios.post("http://localhost:3001/signIn", {
        //         username: username,
        //         password: password
        //     })
        //     // .then((response) => {
        //     //     console.log(response);
        //     // })
        //     .then((res)=>{
        //         alert("登入成功");
        //     })
        //     .catch((e)=>{
        //         if(e){
        //             console.log(e);
        //         }
        //     })
        // }else if(username === ""){
        //     alert("請輸入帳號");
        // }else{
        //     alert("請輸入密碼");
        // }
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
                        <form>

                            <label htmlFor="memberAccount">帳號</label>
                            <input type="text"
                                name="memberAccount"
                                id="memberAccount"
                                required
                                onChange={(e) => { setUsername(e.target.value) }} />


                            <label htmlFor="memberPassword">密碼</label>
                            <input
                                type="password"
                                name="memberPassword"
                                id="memberPassword"
                                required
                                onChange={(e) => { setPassword(e.target.value) }} />


                            <input
                                type="submit"
                                name="submitInfo"
                                id="submitInfo"
                                value="登入"
                                onClick={goSignIn} />
                        </form>
                    </div>
                    <div id={`join_member`}>
                        <p><a href="#">加入會員</a></p>
                        <p>|</p>
                        <p><a href="#">忘記密碼</a></p>
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
