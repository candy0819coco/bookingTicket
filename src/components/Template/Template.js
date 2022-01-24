import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Template.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const Template = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`_container`}>
            <Provider value={contextValue}>
                <div className="____">

                </div>
            </Provider>
        </div>
    );
};
export default Template;
