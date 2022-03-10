import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../../store/users";
import { getNewPosts } from "../../../store/posts";
import "../SideNavs.css";

function RightNavPanel() {
	const [users, setUsers] = useState([]);
	const user = useSelector((state) => state?.session?.user);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/users/");
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	if (!user) {
		return null;
	}
	const userComponents = users?.map((user) => {
		return (
			<div className="users_list" key={user.id}>
				<ul className="user">
					<li key={user.profile_img_url}>
						<NavLink to={`/users/${user.id}`}>
							<img className="rnav_profile_img" src={user.profile_img_url} />
						</NavLink>
					</li>
					<li key={user.id}>
						<NavLink to={`/users/${user.id}`}>
							<p className="rnav_username">{user.username}</p>
						</NavLink>
					</li>
				</ul>
			</div>
		);
	});

	return (
		<>
			<div className="right_nav_container">
				<div className="right_nav_options">
					<div className="user_list_header">
						<h1 className="right_nav_title">Munchers</h1>
					</div>
					<div className="users_list">{userComponents}</div>
				</div>
			</div>
		</>
	);
}

export default RightNavPanel;
