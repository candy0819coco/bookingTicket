import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./User.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const User = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`user_container`}>
            <Provider value={contextValue}>
                <div className="____">

                </div>
            </Provider>
        </div>
    );
};
export default User;
