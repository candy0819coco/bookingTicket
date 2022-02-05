import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./About.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const About = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`about_container`}>
                <div className="____">
                        About Content
                </div>
        </div>
    );
};
export default About;
