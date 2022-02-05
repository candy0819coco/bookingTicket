import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./TicketPicker.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const TicketPicker = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`ticket_picker_container`}>
                <div className="____">

                </div>
        </div>
    );
};
export default TicketPicker;
