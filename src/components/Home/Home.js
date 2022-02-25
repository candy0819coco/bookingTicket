import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Home.scss";
import { Provider } from "../context";
import 'bootstrap/dist/css/bootstrap.css';
import * as R from "ramda";
import context from "./../context";
import Mask from "./Mask";
import { Modal } from "bootstrap/dist/css/bootstrap.css";

const Home = () => {
    const contextValue = useContext(context);
    const { isDarkMode } = contextValue;
    return (
        <div className={`home_container ${isDarkMode ? "home_container_dark" : ""}`}>
            <Provider value={contextValue}>
                {/* select1 image switch*/}
                <div className={`home_background ${isDarkMode ? "home_background_dark" : ""}`}>
                    <div className="grass grass_1"></div>
                    <div className="grass grass_2"></div>
                    <div className="grass grass_3"></div>
                    <div className="logo"></div>
                    <div className="solidIndex"></div>
                    <div className="solidIndex"></div>
                    <div className="effect"></div>
                    <div className="showTheme"></div>
                    <div className="hand hand_1"></div>
                    <div className="hand hand_2"></div>
                    <div className="solidIndex"></div>
                </div>
                {/* select2 covid19 warning*/}
                <div className={`home_background2 ${isDarkMode ? "home_background_dark2" : ""}`}>
                    <div className="home_background_box">
                        <div className="c19">
                            <div style={{fontSize:"32px",color:"#555555",left:"33px",position:"relative",margin:"5px"}}>Covid-19 warning!</div>
                            <Mask />
                        </div>
                    </div>

                </div>
                {/* select3 news*/}
                <div className={`home_background3 ${isDarkMode ? "home_background_dark3" : ""}`}>
                     <div className="newsImage"></div>
                     <div className="fire"></div>
                     <div className="camp"></div>
                     <div className="news"></div>
                </div>
                {/* select4 sitemap by candy*/}
            </Provider>
        </div>

    );
};
export default Home;
