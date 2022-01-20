import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "./components/context";
const App = () => {
  const contextValue = {

  }
  return (
    <div>
    <Provider value={contextValue}>
      <Navbar/>
      <Footer/>
    </Provider>
    </div>
  );
};

export default App;