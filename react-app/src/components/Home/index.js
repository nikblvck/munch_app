import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPosts } from '../../store/posts';
import './Home.css';

function HomeFeed() {

  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const posts = useSelector(state => state?.posts?.posts);
  const postsArray = Object?.values(posts);

  console.log(posts)

  useEffect(() => {
    dispatch(getPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return !isLoaded ? null : (
    <>
      <div className="home_feed_container">
        <div className="home_feed_header">
          <h1>Home Feed</h1>
        </div>
        <div className="individual_post">
          <ul className="post_content">
            {postsArray.map((post) => (
              <>
                <li>{user.username}</li>
                <li>
                  <img src={post.image_url} alt={post.title} />
                </li>
                <li>{post.caption}</li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default HomeFeed;
