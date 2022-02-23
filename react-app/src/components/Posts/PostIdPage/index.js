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
  const postId = useParams();
  console.log(postId)
  const post = useSelector((state) => state?.posts?.posts);
  const user = useSelector((state) => state?.session?.user);
  const [loaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    dispatch(getOnePost(postId.id)).then(()=> getComments(postId.id)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      content,
      post_id: post.id,
      user_id: user.id,
    };
    console.log(newComment);
    if (newComment) {
      dispatch(addComment(newComment)).then(() => setIsLoaded(false))
    } else {
      setErrors(["Please fill out all fields"]);
    }
  };





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
            <div className="add_comment_form">
              <form onSubmit={handleSubmit}>
                <input
                  type="textarea"
                  placeholder="Add a comment..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Add Comment</button>
              </form>
            </div>
            {post.comments === 0 ? null : <CommentsDiv postId={post?.id} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostIdPage;
