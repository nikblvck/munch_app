
import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import AboutButton from './AboutButton';
import DemoUser from './Demo';
import ProfileButton from './ProfileButton';
import './Nav.css'

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  let navLinks

  if (!user) {
    navLinks = (
      <>
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
      </>
    );
  } else {
    navLinks = (
      <>

        <div>
          <p className="welcome">Good vibes, {user.first_name}! </p>
        </div>
        <ProfileButton user={user} />
      </>
    );
  }

  return (
    <nav>
      <div className="nav_container">
        <div className="left_nav">
          <div key="home" className="title">
            <NavLink to="/">
              <h1>MUNCH</h1>
            </NavLink>
          </div>
          <div>
            <AboutButton />
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
