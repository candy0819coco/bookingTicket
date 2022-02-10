import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Camp.scss";
import * as R from "ramda";
import context, { Provider } from "../context";

const Camp = () => {
    const contextValue = useContext(context);
    const { setMyTicketOrderList} = contextValue;

    return (
        <div className={`camp_container`}>
            <Provider value={contextValue}>
                <div className="camp_area_container">
                    <div className="camp_map">                        
                    
                        <div className="camp camp_A"></div>
                        <div className="stage"></div>
                        <div className="camp camp_B"></div>
                        <div className="camp camp_C"></div>
                        <div className="tree_one"></div>
                        <div className="tree_two"></div>
                        <div className="tree_three"></div>
                    </div>

                </div>
            </Provider>
        </div>
    );
};
export default Camp;
