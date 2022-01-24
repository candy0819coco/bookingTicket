import React, {
    useCallback,
    useState,
    useEffect,
    Fragment,
    useContext,
  } from "react";
  import "./Footer.scss";
  
  const Footer = (props) => {
    const { isDarkMode, setIsDarkMode } = props;
    const handleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
    return (
    <div className="footer_container">
      <div className={`footer_area ${isDarkMode?"footer_area_dark":""}`}>
        <div className="copy_right_area">
            <div className="copy_right_text_a">Copyright&nbsp;&nbsp;2022&nbsp;&nbsp;Love&Peace&nbsp;&nbsp;Rock&nbsp;&nbsp;Festival.&nbsp;&nbsp;All&nbsp;&nbsp;rights&nbsp;&nbsp;reserved.
            </div>
            <div className="copy_right_text_b">The website is developed and designed by me, powered by react.js
          </div>
        </div>
        <div className="icon_area">
            <div className="icon ig_icon"></div>
            <div className="icon fb_icon"></div>
        </div>
      </div>
    </div>
    );
  };
  
  export default Footer;