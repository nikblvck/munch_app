function SearchBar() {
	return (
		<>
			<div className="search_container">
				<form className="search_bar" action="/search">
					<input className="search_input" type="search" name="x"  />
					<button className="search_btn" type="submit">
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</form>
			</div>
		</>
	);
}

export default SearchBar;
