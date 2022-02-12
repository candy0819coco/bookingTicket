import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./TicketOrderDetail.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const TicketOrderDetail = (props) => {
    const contextValue = useContext(context);
    const { } = contextValue;
    const {setTicketOrderStep} = props;

    return (
        <div className={`ticket_order_detail_container`}>
                <div className="ticket_order_detail">
                    票券數量及細節
                    <button onClick={()=>setTicketOrderStep(0)}>上一步</button>
                    <button onClick={()=>setTicketOrderStep(2)}>下一步</button>
                </div>
        </div>
    );
};
export default TicketOrderDetail;
