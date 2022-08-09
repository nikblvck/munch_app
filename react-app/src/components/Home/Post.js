import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './Home.css';

function Post({post, handleDelete, handleLikePost}) {
    const user = useSelector((state) => state?.session?.user);

  return (
		<>
			<div className="single-post-container">
				<div className="single-post-header">
						<div className="user-avi-container">
							<img
								className="user-small-avi"
								src={user.profile_img}
								alt="user avi"
							/>
						</div>

						<div className="username-container">
							<p className="post-username">{user.username}</p>
					</div>
				</div>
				<div className="img-container">
					{post.images.map((image) => (
            <div className="grid">
						<img className="post-img" src={image.url} alt="post image" />
            </div>
					))}
				</div>
        <div className="post-content-container">
          <p className="post-caption"> {user.username}  {post.caption}</p>
        </div>
			</div>
		</>
	);
}

export default Post;
