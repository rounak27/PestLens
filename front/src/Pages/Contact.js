import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <p className="lead">
        We'd love to hear from you! Reach out to us through the following
        channels:
      </p>
      <ul className="list-unstyled">
        <li className="mb-2">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <strong>Phone Number:</strong> 9842478862
        </li>
        <li className="mb-2">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <strong>Email:</strong>{" "}
          <a href="mailto:shraniksangat9@gmail.com">shraniksangat9@gmail.com</a>
        </li>
        <li className="mb-2">
          <FontAwesomeIcon className="mr-2" />
          <strong>Instagram:</strong>{" "}
          <a
            href="https://www.instagram.com/neplants.np/"
            target="_blank"
            rel="noopener noreferrer"
          >
            neplants.np
          </a>
        </li>
      </ul>
      <p>
        Whether you have inquiries, feedback, or just want to connect, we look
        forward to hearing from you!
      </p>
    </div>
  );
};

export default Contact;
