
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Nav.css'
const NavBar = () => {
  return (
    <nav>
      <div className="nav_container">
        <ul className="nav_links_list">
          <li className="nav_links">
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav_links">
            
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li className="nav_links">

            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
          <li className="nav_links">

            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li>
          <li className="nav_links">

            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
