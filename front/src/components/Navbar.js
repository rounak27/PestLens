import React from "react";
import Logo from "./fyp_logo.png";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#12372A" }}
    >
      <a className="navbar-brand" href="/" style={{ marginLeft: "30px" }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "100px", height: "60px" }}
          className="img-fluid"
        />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ marginRight: "30px" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
        style={{ marginRight: "30px" }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/" style={{ color: "#FFF" }}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about" style={{ color: "#FFF" }}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact" style={{ color: "#FFF" }}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
