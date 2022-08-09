import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts, deletePost, likePost} from "../../store/posts";
import Swiper from "swiper";
import Post from "./Post";


import './Home.css'

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
		if(!isLoaded) {
			fetchData();
		}
  }, [dispatch, isLoaded]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => setIsLoaded(false)).then(() => dispatch(getPosts())).then(() => setIsLoaded(true));

  }

	const handleLikePost = async (post_id) => {

		await dispatch(likePost(post_id))
		await dispatch(getPosts())
	}




  return (
		<>
		<div className="main_container">
			<div className="home_feed_container">
				<div className="home_feed_header">
					<h1 className="home_feed_title">Home Feed</h1>
				</div>
				<div className="post_content_list">
					{posts?.map((post) => (
						//uses single post component to display each post
						<Post key={post.id} post={post} handleDelete={handleDelete} handleLikePost={handleLikePost} />
					))}
				</div>
			</div>
		</div>
		</>
	);
}

export default HomeFeed;
