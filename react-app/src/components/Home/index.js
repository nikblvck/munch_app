import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts} from "../../store/posts";
import "./Home.css";

function HomeFeed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const posts = useSelector((state) => state?.posts?.posts);

  console.log(posts);
  useEffect(() => {
    dispatch(getPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleDelete = () => {

  }

  const handleEdit = () => {
  }

  let userButtons;

  return (
    <>
      <div className="home_feed_container">
        <div className="home_feed_header">
          <h1>Home Feed</h1>
        </div>

        <div className="post_content">
          <div className="individual_post">
            {posts?.map((post) => (
              <>
                <div key={post.username}>{post?.username}</div>
                <div className="post_image" key={post.image_url}>
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="post_image"
                  />
                  {user?.id === post?.user_id && (
                    <div className="product-button-container">
                      <button>Edit</button>
                      <button>Delete product</button>
                    </div>
                  )}
                </div>
                <div>{post.caption}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeFeed;
