import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts, deletePost} from "../../store/posts";
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
  }, [dispatch, isLoaded]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => setIsLoaded(false)).then(() => dispatch(getPosts())).then(() => setIsLoaded(true));

  }




  return (
		<>
			<div className="home_feed_container">
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
										/>{" "}
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
									<div className="post_category">{post?.category_name}</div>

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
