import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Map.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";

const Map = () => {
  const contextValue = useContext(context);
  const { isDarkMode } = contextValue;

  return (
    <div className={`map_container`}>
        <div
          className={`map_background ${
            isDarkMode ? "map_background_dark" : ""
          }`}
        ></div>
    </div>
  );
};
export default Map;
