import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer mt-auto py-3 fixed-bottom"
      style={{ backgroundColor: "#436850" }}
    >
      <div className="container text-center">
        <p className="text-white">
          Copyright © {new Date().getFullYear()} Pestlens. All Rights Reserved.
        </p>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              href="/privacy-policy"
              className="text-decoration-none text-white"
            >
              Privacy Policy
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/terms-of-use" className="text-decoration-none text-white">
              Terms of Use
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
