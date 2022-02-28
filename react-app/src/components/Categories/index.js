import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams, Link} from "react-router-dom";
import { getCategory, getCategories } from "../../store/categories";
import {deletePost } from '../../store/posts';
import './Categories.css'


function CategoryIdPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const categoryId = useParams();
  const id = categoryId.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const postsArray = useSelector((state) => state?.categories?.category)
  const postArrayLength = postsArray?.length;
  const user = useSelector((state) => state?.session?.user);

  useEffect(async () => {

      await dispatch(getCategories());
      await dispatch(getCategory(id))
      setIsLoaded(true)


  }, [dispatch, id, postArrayLength]);



  const handleBack = (e) => {
    e.preventDefault();
    history.push('/posts')
  }

  if (!postArrayLength) {
    return (
      <>
        <div className="home_feed_container">
          <div className="individual_post">
            <div className="no_post_header">
            <h1 className="none_yet">
              No posts in this category yet, check back later!
            </h1>
            </div>
          </div>
        </div>
      </>
    );
  }

    const handleDelete = (id) => {
      dispatch(deletePost(id))
        .then(() => dispatch(getCategory(id)))
        .then(() => setIsLoaded(true));
    };

return (
  <>
    <div className="main_catgory_container">
      <div className="back_button">
        <button onClick={handleBack}>Back To All Posts</button>
      </div>
      <div className="home_feed_container">
        <div>
          <h1 className="home_feed_title">{postsArray[0]?.category_name}</h1>
        </div>
        <div className="post_content">
          {postsArray?.map((post) => (
            <>
              <div className="individual_post">
                <div className="post_header">
                  <div className="header_profile_img">
                    <img src={post?.user_profile_image} alt="profile_pic" />{" "}
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
    </div>
  </>
);

}


export default CategoryIdPage;
