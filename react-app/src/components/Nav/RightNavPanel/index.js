import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../../store/users";
import { getNewPosts } from "../../../store/posts";
import "../SideNavs.css";

function RightNavPanel() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.session?.user);


	// useEffect(() => {
	// 	async function fetchData() {
	// 		dispatch(getUsers());
	// 		dispatch(getNewPosts());
	// 	}
	// 	fetchData();
	// }, [dispatch]);




		if (!user) {
			return null;
		}

	return (
		<>
			<div className="right_nav_container">
				<div className="right_nav_options">
					<NavLink to="/posts"> All Posts</NavLink>
					<NavLink to="/post/new"> New Post</NavLink>
				</div>
			</div>
		</>
	);
}

export default RightNavPanel;
