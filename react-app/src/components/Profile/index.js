import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../store/posts";
import "./Profile.css";

function ProfilePage() {
  const {postUserId} = useParams().id;
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const posts = useSelector((state) => state?.posts?.user_posts.post_list)
  const user = useSelector((state) => state?.session?.user_posts)
  console.log(posts)


  useEffect(() => {
    dispatch(getUserPosts(postUserId));
    setIsLoaded(true);
  }, [isLoaded, dispatch]);



  if (!user) {
    return null;
  }

  return (
    <>
      <div className="main_profile_container">
          <div className="profile_container">
            <div className="profile_image">
              <img
                className="profile_pic"
                src={user.profile_img_url}
                alt={user.username}
              />
            </div>
            <div className="profile_info">
              <div className="profile_username">{user.username}</div>
              <div className="profile_bio">{user.bio}</div>
            </div>
          </div>
          <div className="user_posts">
            <div className="user_posts_header">
              <h2>{user.username}'s Posts</h2>
            </div>
            <div className="user_posts_content">
              {posts?.map((post) => (
                <>
                  <div className="individual_profile_post">
                   <Link to={`/posts/${post.id}`}> <img
                      className="profile_grid_image"
                      src={post.image_url}
                      alt={post.title}
                    /></Link>
                    <div className="prof_post_category">
                      {post.category_name}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
      </div>
    </>
  );
}
export default ProfilePage;
