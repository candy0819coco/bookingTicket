import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import * as R from "ramda";
import context, { Provider } from "../context";
import Axios from 'axios';
import e from "express";


const Register = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const goRegister = () => {

        Axios.post("http://localhost:3001/register", {
            usernameReg: usernameReg,
            passwordReg: passwordReg
        }).then((response) => {
            console.log(response);
        })

    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form>
                <h1>註冊</h1>
                帳號<input type="text"
                    name="usernameReg"
                    id="usernameReg"
                    required
                    onChange={(e) => { setUsernameReg(e.target.value) }} /><br />
                密碼<input type="text"
                    name="passwordReg"
                    id="passwordReg"
                    required
                    onChange={(e) => { setPasswordReg(e.target.value) }} /><br />

                <button onClick={goRegister}>註冊</button>
            </form>
        </div>

    );
};
export default Register;


