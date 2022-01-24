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
import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "./components/context";
const App = () => {
  const [isDarkMode,setIsDarkMode] = useState(false);
  
  const contextValue = {
  }
  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route>
    <div className="App">
    <Provider value={contextValue}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        />
      <Footer
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </Provider>
    </div>
    // </Route>
    // </Routes>
    // </BrowserRouter>
  );
};

export default App;