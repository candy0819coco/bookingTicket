import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Logout.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";
import axios from "axios";

const Logout = (props) => {
    const contextValue = useContext(context);

    const { checkIsLogined, setAccessToken, setUserInfo } = contextValue;
    const {closeModal} = props;

      const handleLogout = async (e) => {
        console.log("按一次登出")
        e.stopPropagation();
              
              closeModal();
              setUserInfo();
              localStorage.removeItem("accessToken");
              setAccessToken("");
              // checkIsLogined();
      };
    return (
        <div className={`logout_container`}>
                <div className="logout">
                    <div className="logout_btn" onClick={(e)=>handleLogout(e)}>登出</div>
                </div>
        </div>
    );
};
export default Logout;
