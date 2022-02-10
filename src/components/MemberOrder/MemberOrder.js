import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./MemberOrder.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const MemberOrder = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`member_order_container`}>
            <Provider value={contextValue}>
                <div className="____">
                MemberOrder Content
                </div>
            </Provider>
        </div>
    );
};
export default MemberOrder;
