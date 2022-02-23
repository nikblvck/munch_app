import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link} from "react-router-dom";
import { getPosts, deletePost} from "../../store/posts";
import CommentsDiv from "../Comments";
import "./Home.css";

function HomeFeed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);
  const posts = useSelector((state) => state?.posts?.posts);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    dispatch(getPosts()).then(() => setIsLoaded(true));
  }, [dispatch, isOpen]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => setIsLoaded(false)).then(() => dispatch(getPosts())).then(() => setIsLoaded(true));
  }

  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  }

  let userButtons;

  let likesDiv


  if (!isLoaded) {
    return null
  }
  return (
    <>
      <div className="home_feed_container">
        <div className="home_feed_header">
          <h2>Home Feed</h2>
        </div>

        <div className="post_content">
          {posts?.map((post) => (
            <>
              <div className="individual_post">
                <div key={post.username} id="post_username">
                 <Link to={`/users/${post.user_id}`}>{post?.username}</Link>
                </div>
                <div className="post_image" key={post.image_url}>
                  <Link to={`/posts/${post.id}`}>
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="post_image"
                    />
                  </Link>
                  <Link to={`/categories/${post.category_id}`}>
                    <div className="post_category">{post.category_name}</div>
                  </Link>
                  <div className="likes_container">
                    <button className="like_btn"><i className="fa-solid fa-heart"></i></button>
                    {!post.likes ? null : (
                      <div className="post_likes">
                        <p>{post.likes}</p>
                      </div>
                    )}
                  </div>

                  {user?.id === post?.user_id && (
                    <div className="post_button_container">
                      <button className="edit_post">
                        <Link to={`/posts/${post.id}/edit`}>
                          <i className="fa-solid fa-pen-to-square" />
                        </Link>
                      </button>
                      <button
                        id={post.id}
                        onClick={(e) => handleDelete(e.target.id)}
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </div>
                  )}
                </div>
                <br />
                {!post?.caption ? null: (
                  <div className="post_caption">
                    <span>{post.username}</span> {post.caption}
                  </div>
                )}
                <div className="post_comments">
                {!post.comment_list.length ? <Link to={`/posts/${post.id}`}>Be The First To Add A Comment!</Link> : (
                  <Link to={`/posts/${post.id}`}>View Comments</Link>
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
