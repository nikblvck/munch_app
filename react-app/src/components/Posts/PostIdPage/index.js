import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getOnePost, editPost, deletePost} from "../../../store/posts";
import {getComments, addComment} from "../../../store/comments";
import CommentsDiv from "../../Comments";
import {Modal} from "../../../context/Modal";
import './PostIdPage.css'

function PostIdPage () {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId2 = useParams();
  const post = useSelector((state) => state?.posts?.posts);
  const user = useSelector((state) => state?.session?.user);
  const [loaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect( async() => {

    await dispatch(getOnePost(postId2.id))
    await dispatch(getComments(postId2.id))
    setIsLoaded(true)
  }, [dispatch, loaded, errors]);





if (!loaded) {
  return null
}

  return (
    <>
      <div className="main_container">
        <div className="header_links">
          <button onClick={() => history.push("/posts")}>Back to Posts</button>
        </div>
        <div className="individual_post_container">
          <div>{user.username}'s Post</div>
          <div className="individual_post_image_container">
            <img src={post?.image_url} alt="post" />
          </div>
          <div className="individual_post_caption_container">
            <p>{post?.caption}</p>
          </div>
          <div>

            {!loaded ? null : <CommentsDiv loaded={loaded} postId={postId2} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostIdPage;
