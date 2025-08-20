import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import letterImage from "../assets/letter-m.png"; // your image path

import "./Navbar.css"; // if you want custom styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left">
        <img src={letterImage} alt="Logo" className="nav-logo" />
      </div>
      <div className="mid">
        <Link to="/" className="nav-btn">
          Home
        </Link>

        <a href="#shop" className="nav-btn">
          Shop
        </a>
        <a href="#about" className="nav-btn">
          About
        </a>
        <a href="#contact" className="nav-btn">
          Contact
        </a>
      </div>
      <div className="right">
        <div className="navbar-user-buttons">
          <Link to="/cartPage" className="user-button">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <Link to="/Auth" className="user-button">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
