import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../../store/categories";
import "../SideNavs.css";

function LeftNavPanel() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state?.session?.user);
	const categories = useSelector((state) => state?.categories?.categories);

	useEffect(() => {
		async function fetchData() {
			await dispatch(getCategories());
			setIsLoaded(true);
		}
		fetchData();
		if (!isLoaded) {
			fetchData();
		} else {
			return;
		}
	}, [dispatch, isLoaded]);

	console.log(categories)
	if(!user) {
		return null
	}
	return (
				<>
			<div className="left_nav_container">
				<div className="left_nav_options">
				 <div className="category_list_header">
					 <h1 className="left_nav_title">Categories</h1>
					</div>
					<div className="categories_list">
						{categories?.map((category) => (
							<div className="category_list_item">
								<NavLink to={`/categories/${category?.name}`} className="left_panel_link">
									{category?.name}
									</NavLink>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default LeftNavPanel;
