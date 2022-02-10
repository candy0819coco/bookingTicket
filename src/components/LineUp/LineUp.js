import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./LineUp.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const LineUp = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`line_up_container`}>
            <Provider value={contextValue}>
                <div className="____">
                        LineUp Content
                </div>
            </Provider>
        </div>
    );
};
export default LineUp;
