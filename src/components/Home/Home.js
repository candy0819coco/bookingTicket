import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Home.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const Home = () => {
    const contextValue = useContext(context);
    const { isDarkMode } = contextValue;

    return (
        <div className={`home_container ${isDarkMode ? "home_container_dark":"" }`}>
                <div className={`home_background ${isDarkMode ? "home_background_dark":"" }`}>
                </div>
        </div>
    );
};
export default Home;
