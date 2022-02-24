
import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import NewPost from '../Posts/NewPost';
import DemoUser from './Demo';
import './Nav.css'

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  let navLinks

  if (!user) {
    navLinks = (
      <>
        <ul>
          <li>
            <DemoUser />
          </li>
          <li key="nav_left_login">
            <NavLink to="/login" className="nav_link"><button>
              Log In
            </button>
            </NavLink>
          </li>
          <li key="nav_left_signup">
            <NavLink to="/signup" className="nav_link">
              <button>
                Sign Up
              </button>
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
            <NavLink to="/post/new" exact={true} className="nav_link">
            <i class="fa-solid fa-plus"></i>
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
          <li key="home" className="title"><NavLink to="/"><h1>
            MUNCH
            </h1></NavLink></li>
            <li>
              <NavLink to="/posts" className="nav_link">
                <button>
                  Posts
                </button>
              </NavLink>
            </li>
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
