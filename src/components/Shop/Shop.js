import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./Shop.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const Shop = () => {
    const contextValue = useContext(context);
    const { } = contextValue;

    return (
        <div className={`shop_container`}>
                <div className="____">
                        Shop Content
                </div>
        </div>
    );
};
export default Shop;
