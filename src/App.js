import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./App.scss";
// import Navbar from "./components/Navbar/Navbar";
import Festival from "./components/Festival/Festival";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "./components/context";
const App = () => {
  const contextValue = {

  }
  return (
    <div className="App">
    <Provider value={contextValue}>
      <Festival/>
    </Provider>
    </div>
  );
};

export default App;