import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faGear } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss"; // Import SCSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faGear} />
          <span>Settings</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

