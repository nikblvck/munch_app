import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getUserPosts} from '../../store/posts';

function Profile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


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

const posts = useSelector((state) => state?.session?.user.post_list);

  if (!user) {
    return null;
  }

  return (
   <>
   <div className="main_container">
      <div className="profile_container">

      </div>
      <div className="user_posts">
        <div className="user_posts_header">
          <h2>{user.username}'s Posts</h2>
        </div>
        <div className="user_posts_content">
          {posts?.map((post) => (
            <>
              <div className="individual_profile_post">
                <img className="profile_grid_image" src={post.image_url} alt={post.title} />
                <div className="prof_post_category">{post.category_name}</div>
              </div>
            </>
          ))}
      </div>
      </div>
   </div>
   </>
  );
}
export default Profile;
