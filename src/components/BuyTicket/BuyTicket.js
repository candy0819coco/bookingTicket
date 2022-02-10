import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./BuyTicket.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "../context";

const BuyTicket = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`buy_ticket_container`}>
            <Provider value={contextValue}>
                <div className="____">

                </div>
            </Provider>
        </div>
    );
};
export default BuyTicket;
