import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Profile.css';
function ProfilePage() {
	const { userId } = useParams();
  const [user, setUser] = useState({})
	console.log(userId);
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

	return (
  <>
    <div className="home_feed_container">
      <div className="profile_container">
        <div className="profile_header">
          <div className="profile_header_img">
            <img
              className="profile_header_image"
              src={user?.profile_img_url}
              alt="profile_pic"
            />
          </div>
          <div className="profile_header_username">
            <h2 classname="profile_username">{user?.username}</h2>
          </div>
          <div className="user_bio">
            <p>
              {user?.bio}
            </p>
          </div>
          <div className="user_posts">
            <div className="user_posts_header">
              <h3>{user?.post_list?.length} Post(s)</h3>
            </div>
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
                </div>
                </>
                ))}
          </div>
        </div>
        </div>
    </div>
  </>
	);
}

export default ProfilePage;
