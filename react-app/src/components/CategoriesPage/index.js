import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCategories, getCategory } from "../../store/categories";
import { getPosts, deletePost } from "../../store/posts";


function CategoryPage() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.session?.user);
	const category_name = useParams().id;
	console.log(category_name);
	const category = useSelector((state) => state?.categories?.category);
	const posts = category?.posts;
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDelete = (id) => {
		dispatch(deletePost(id))
			.then(() => dispatch(getPosts()))
			.then(() => setIsLoaded(true));
	};

	useEffect(() => {
		async function fetchData() {
			dispatch(getCategories());
			dispatch(getCategory(category_name));
		}
		fetchData();
	}, [dispatch, category_name]);

	return (
		<>
			<div className="home_feed_container">
				<div className="post_content">
					<div className="category_title_container">
						<h1 className="category_title">{category?.name}</h1>
					</div>
					{posts?.map((post) => (
						<>
							<div className="individual_post">
								<div className="post_header">
									<div className="header_profile_img">
										<img
											className="post_header_image"
											src={post?.user_profile_image}
											alt="profile_pic"
										/>
									</div>
									<div
										className="header_username"
										key={post?.username}
										id="post_username"
									>
										{post?.username}
									</div>
								</div>
								<div className="post_image" key={post?.image_url}>
									<Link to={`/posts/${post?.id}`}>
										<img
											src={post?.image_url}
											alt={post?.title}
											className="post_image"
										/>
									</Link>
									<div className="post_category">
										<Link to={`/categories/${post?.category_name}`}>
											{post?.category_name}
										</Link>
									</div>

									{user?.id === post?.user_id && (
										<div className="post_button_container">
											<button className="edit_post">
												<Link to={`/posts/${post?.id}/edit`}>Edit</Link>
											</button>
											<button
												className="delete_btn"
												id={post?.id}
												onClick={(e) => handleDelete(e.target.id)}
											>
												Delete
											</button>
										</div>
									)}
								</div>
								<br />
								{!post?.caption ? null : (
									<div className="post_caption">
										<span>{post.username}</span> {post.caption}
									</div>
								)}
								<div className="post_comments">
									{!post?.comment_list?.length ? (
										<Link to={`/posts/${post?.id}`}>
											Be The First To Add A Comment!
										</Link>
									) : (
										<Link to={`/posts/${post?.id}`}>View Comments</Link>
									)}
								</div>
							</div>
						</>
					))}
				</div>
			</div>
		</>
	);
}

export default CategoryPage;
