import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./TicketPicker.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const TicketPicker = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`ticket_picker_container`}>
            <Provider value={contextValue}>
                <div className="____">

                </div>
            </Provider>
        </div>
    );
};
export default TicketPicker;
