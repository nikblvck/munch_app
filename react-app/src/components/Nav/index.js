
import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Nav.css'

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  let navLinks

  if (!user) {
    navLinks = (
      <>
        <ul>
          <li key="nav_left_login">
            <NavLink to="/login" className="nav_link">
              Login
            </NavLink>
          </li>
          <li key="nav_left_signup">
            <NavLink to="/signup" className="nav_link">
              Signup
            </NavLink>
          </li>
        </ul>
      </>
    );
  } else {
    navLinks = (
      <>
        <ul>
          <li>
            <p>Welcome, {user.first_name}</p>{" "}
          </li>
          <li key="nav_right_post">
            <NavLink to="/posts/new" className="nav_link">
              New Post
            </NavLink>
          </li>
          <li key="nav_right_logout">
          <LogoutButton />
          </li>
        </ul>
      </>
    );
  }

  return (
    <nav>
      <div className="nav_container">
      <div className="left_nav">
        <ul>
          <li key="home"><NavLink to="/posts">Munch</NavLink></li>
        </ul>
      </div>
      <div className="right_nav">
        {navLinks}
      </div>
      </div>
    </nav>
  );
}

export default NavBar;
