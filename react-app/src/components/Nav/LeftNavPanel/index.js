import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../SideNavs.css";

function LeftNavPanel() {
	const user = useSelector((state) => state?.session?.user);
	const navLinks = (
		<>
			<div className="left_nav_container">
				<div className="left_nav_options">
					<NavLink to="/posts"> All Posts</NavLink>
				</div>
			</div>
		</>
	);

	return (
		<>
			<div className="left_nav_container">
				<div className="left_nav_options">
					<NavLink to="/posts"> All Posts</NavLink>
					<NavLink to="/post/new"> New Post</NavLink>
				</div>
			</div>
		</>
	);
}

export default LeftNavPanel;
