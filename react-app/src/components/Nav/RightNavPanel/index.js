import React from 'react';
import {useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../SideNavs.css';

function RightNavPanel() {

  const user = useSelector(state => state?.session?.user)


  return (
    <>
    <div className="right_nav_container">
      <div className="right_nav_options">
        <NavLink to="/posts"> All Posts</NavLink>
        <NavLink to="/posts/new"> New Post</NavLink>
      </div>
    </div>
    </>
  )
}

export default RightNavPanel;
