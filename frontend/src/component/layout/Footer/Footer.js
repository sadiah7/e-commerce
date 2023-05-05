import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    // <footer id="footer">
    //   <div className="leftFooter">
    //     <h4>DOWNLOAD OUR APP</h4>
    //     <p>Download App for Android and IOS mobile phone</p>
    //     <img src={playStore} alt="playstore" />
    //     <img src={appStore} alt="Appstore" />
    //   </div>

    //   <div className="midFooter">
    //     <h1>ECOMMERCE.</h1>
    //     <p>High Quality is our first priority</p>

    //     <p>Copyrights 2021 &copy; Sadiah</p>
    //   </div>

    //   <div className="rightFooter">
    //     <h4>Follow Us</h4>
    //     <a href="http://instagram.com/">Instagram</a>
    //     <a href="http://youtube.com/">Youtube</a>
    //     <a href="http://instagram.com/">Facebook</a>
    //   </div>
    // </footer>
    <footer id="Footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Apollo</h1>
        <p>High Quality is our first priority</p>
        <div className="box-container">
          <h3>QUICK LINKS :</h3>
          <div className="box">
            <Link to="/">HOME</Link> &nbsp; &nbsp;
            <Link to="/about">ABOUT</Link> &nbsp; &nbsp;
            <Link to="/products">PRODUCTS</Link> &nbsp; &nbsp;
            <Link to="/contact">CONTACT</Link> &nbsp; &nbsp;
          </div>
          <div className="box">
            <h3>EXTRA LINKS :</h3>
            <Link to="/login">ACCOUNT</Link> &nbsp; &nbsp;
            <Link to="/orders">ORDER</Link> &nbsp; &nbsp;
            <Link to="/cart">CART</Link> &nbsp; &nbsp;
          </div>
        </div>

        <p>Copyrights 2023 &copy; Eprinting</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://youtube.com">YOUTUBE</a>
      </div>
    </footer>
  );
};
