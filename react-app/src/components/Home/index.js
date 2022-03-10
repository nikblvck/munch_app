import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts, deletePost, likePost} from "../../store/posts";
import "./Home.css";

function HomeFeed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const posts = useSelector((state) => state?.posts?.posts);



  useEffect(() => {
    async function fetchData() {
      dispatch (getPosts());
      setIsLoaded(true);
    }
    fetchData();
		if(!isLoaded) {
			fetchData();
		}
  }, [dispatch, isLoaded]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => setIsLoaded(false)).then(() => dispatch(getPosts())).then(() => setIsLoaded(true));

  }

	const handleLikePost = async (post_id) => {
		console.log('xxxxxxxxxxxxxx')
		console.log(post_id)
		await dispatch(likePost(post_id))
		await dispatch(getPosts())
		setIsLoaded(true)
	}
  return (
		<>
			<div className="home_feed_container">
				<div className="home_feed_header">
					<h1 className="home_feed_title">Home Feed</h1>
				</div>
				<div className="post_content">
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
										<Link to={`/users/${post?.user_id}`}>
										{post?.username}
										</Link>
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


										<>
									<div className="likes_div">
										<div className="like_btn">
											<button id={post?.id} onClick={() => handleLikePost(post?.id)}>
												<i class="fa-solid fa-heart"></i>
											</button>
										</div>
										<div className="likes_count">
											{!post.likes ? 0 : post?.likes}
											</div>
									</div>
									</>



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

export default HomeFeed;
