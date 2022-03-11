import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deletePost } from '../../store/posts';
import './Profile.css';


function ProfilePage() {
	const { userId } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({})
	const sessionUser = useSelector(state => state?.session?.user);


	useEffect(() => {
		if (!userId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	}, [userId]);

	console.log(user);
  console.log(user.post_list)
	if (!user) {
		return null;
	}


  const handleDelete = (id) => {
		dispatch(deletePost(id))
    (async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	};
	return (
		<>
			<div className="home_feed_container" id="profile">
				<div className="profile_container">
					<div className="profile_header">
						<div className="profile_header_top">
							<div className="profile_header_username">
								<h2 classname="profile_username">{user?.username}</h2>
							</div>
							<div className="profile_header_img">
								<img
									className="profile_header_image"
									src={user?.profile_img_url}
									alt="profile_pic"
								/>
							</div>
						</div>

						<div className="user_bio">
							<p className="strong">Bio</p>
							<p>{user?.bio}</p>
							<p className="strong">Member Since</p>
							<p>{user?.member_since}</p>
						</div>
						<div className="user_posts_container">
							<div className="user_posts_header">
								<h3>{user?.post_list?.length} Post(s)</h3>
							</div>
							<div className="user_posts">
								{user?.post_list?.map((post) => (
									<>
										<div className="individual_profile_post">
											<div className="profile_post_image_container">
												<img
													className="profile_post_image"
													src={post?.image_url}
													alt="post_img"
												/>
											</div>
											{sessionUser?.id === post?.user_id && (
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
											<div className="profile_likes_div">
												<p>{post?.likes}</p>
											</div>
											<div className="profile_post_caption">
												{!post?.caption && <p>No Caption</p>}
												{post?.caption && <p>{post?.caption}</p>}
											</div>
										</div>
									</>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfilePage;
