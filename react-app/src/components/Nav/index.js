
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
        <div>
          <div>
            <DemoUser />
          </div>
          <div key="nav_left_login">
            <NavLink to="/login" className="nav_link"><button>
              Log In
            </button>
            </NavLink>
          </div>
          <div key="nav_left_signup">
            <NavLink to="/signup" className="nav_link">
              <button>
                Sign Up
              </button>
            </NavLink>
          </div>
        </div>
      </>
    );
  } else {
    navLinks = (
      <>
          <div>
            <p className="welcome">Welcome, {user.first_name}</p>{" "}
          </div>
          <div key="nav_right_post">
            <NavLink to="/post/new" exact={true} className="nav_link">
            <i className="fa-solid fa-plus"></i>
            </NavLink>
          </div>
          <div key="nav_right_logout">
            <LogoutButton />
          </div>
      </>
    );
  }

  return (
    <nav>
      <div className="nav_container">
      <div className="left_nav">

          <div key="home" className="title"><NavLink to="/"><h1>
            MUNCH
            </h1></NavLink></div>
            <div>
              <a href="https://www.github.com/nikblvck/munch_app">
                <button>
                  About
                </button>
              </a>
            </div>

      </div>
      <div className="right_nav">
        {navLinks}
      </div>
      </div>
    </nav>
  );
}

export default NavBar;
