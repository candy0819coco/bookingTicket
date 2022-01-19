import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "./components/context";
const App = () => {
  const contextValue = {

  }
  return (
    <div>
    <Provider value={contextValue}>
      <Navbar/>
    </Provider>
    </div>
  );
};

export default App;