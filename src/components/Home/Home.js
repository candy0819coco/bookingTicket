import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Home.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const Home = () => {
    const contextValue = useContext(context);
    const { isDarkMode } = contextValue;

    return (
        <div className={`home_container ${isDarkMode ? "home_container_dark":"" }`}>
            <Provider value={contextValue}>
                <div className={`home_background ${isDarkMode ? "home_background_dark":"" }`}>
                </div>
            </Provider>
        </div>
    );
};
export default Home;
