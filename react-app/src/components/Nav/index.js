
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Nav.css'
const NavBar = () => {
  return (
    <nav>
      <div className="nav_container">
        <div className="left_nav">
          <NavLink to="/posts" className="nav_link">
            <h1>Munch</h1>
          </NavLink>
        </div>
        <div className="right_nav">
          {/* <i className="fa-solid fa-utensils"></i> */}
          <NavLink to="/signup" className="nav_link">
            <h3>Sign Up</h3>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
