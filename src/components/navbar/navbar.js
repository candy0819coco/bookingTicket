import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbarArea">
      <div className="containerBox">
        <div className="mainLogoArea">
          <div className="mainLogo"></div>
        </div>
        <div className="containerRight">
          <div className="containerText">
            <div className="navAbout">About</div>
            <div className="navLineUp">Line up</div>
            <div className="navTicket">Ticket</div>
            <div className="navMap">Map</div>
            <div className="navShop">Shop</div>
          </div>
          <div className="iconArea">
            <div className="icon toggleBtn"></div>
            <div className="icon cartIcon"></div>
            <div className="icon userIcon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
