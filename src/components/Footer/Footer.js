import React, {
    useCallback,
    useState,
    useEffect,
    Fragment,
    useContext,
  } from "react";
  import "./Footer.scss";
  
  const Footer = () => {
    return (
      <div className="footerArea">
        <div className="copyRightArea">
            <div className="copyRightTextA">Copyright 2022 Love&Peace Rock Festival. All rights reserved.
            </div>
            <div className="copyRightTextB">The website is developed and designed by me, powered by react.js
            </div>
        </div>
        <div className='iconArea'>
            <div className="icon igIcon"></div>
            <div className="icon fbIcon"></div>
        </div>
      </div>
    );
  };
  
  export default Footer;