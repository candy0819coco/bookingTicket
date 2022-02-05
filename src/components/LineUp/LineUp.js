import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./LineUp.scss";
import * as R from "ramda";
import context, { Provider } from "./../context";

const LineUp = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`line_up_container`}>
                <div className="____">
                        LineUp Content
                </div>
        </div>
    );
};
export default LineUp;
