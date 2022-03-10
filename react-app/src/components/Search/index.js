import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchPosts } from "../../store/search";

function Search() {
	const dispatch = useDispatch();
	const searchResults = useSelector((state) => state.search);
	const results = Object.values(searchResults);

	const search = useLocation().search;
	const x = new URLSearchParams(search).get("x");

	useEffect(() => {
		dispatch(searchPosts(x));
	}, [dispatch, x]);

	if (!results?.length) {
		return (
			<>
				<div className="home_feed_container">
					<h3>No results found for {x}</h3>;
				</div>
			</>
		);
	} else {
		return (
			<>

			</>
		);
	}
}

export default Search;
