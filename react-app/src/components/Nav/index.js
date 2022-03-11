
import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import AboutButton from './AboutButton';
import DemoUser from './Demo';
import ProfileButton from './ProfileButton';
import LeftNavPanel from './LeftNavPanel';
import RightNavPanel from './RightNavPanel';
import SearchBar from './Search_Bar';
import './Nav.css'

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  let navLinks

  if (!user) {
    navLinks = (
      <>
          <div className="nav_left_login">
            <DemoUser />
          </div>
          <div className="nav_left_login">
            <NavLink to="/login" className="nav_link"><button>
              Log In
            </button>
            </NavLink>
          </div>
          <div className="nav_left_signup">
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
              <img
              className="nav_logo"
              src="https://res.cloudinary.com/bigtechnik/image/upload/v1646848241/munch/Munch_Assets/MUNCH_hrofck.png"
              />
            </NavLink>
          </div>
          <div>
            <AboutButton />
          </div>
        </div>
        {/* <div className="center_nav">
          <SearchBar />
        </div> */}
        <div className="right_nav">
          {navLinks}
        </div>
      </div>
      <LeftNavPanel />
      <RightNavPanel />
    </nav>
  );
}

export default NavBar;
