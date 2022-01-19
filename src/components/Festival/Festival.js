import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./Festival.scss";

const Festival = () => {
  return (
    <div className="navbarArea">
      <div className="containerBox">
        <div className="mainLogoArea">
          <div className="mainLogo">456</div>
        </div>
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
  );
};
export default Festival;
