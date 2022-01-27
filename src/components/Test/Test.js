import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Test.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const Test = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    R.list(array)
    return (
        <div className={`_container`}>
            <Provider value={contextValue}>
                <div className="____">
                        
                </div>
            </Provider>
        </div>
    );
};
export default Test;
