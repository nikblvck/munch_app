import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getOnePost, editPost, deletePost} from "../../../store/posts";
import {getComments} from "../../../store/comments";
import CommentsDiv from "../../Comments";


function PostIdPage () {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = useParams();
  console.log(postId)
  const post = useSelector((state) => state?.posts?.posts);
  const user = useSelector((state) => state?.session?.user);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOnePost(postId.id)).then(()=> getComments(postId.id)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

  console.log(post?.comment_list)

  const addComment = () => {
    history.push(`/posts/${postId.id}/comments/new`);
  }
  let commentsDiv

  if(post?.comment_list?.length === 0) {
    commentsDiv = null
  } else {
    commentsDiv = post?.comment_list?.map((comment) => (
      <div className="comment_div">
        <p><b>{comment.username}</b> {comment.content}</p>
        {user?.id === comment?.user_id && (
          <div className="edit_delete_container">
            <button onClick={() => dispatch(editPost(comment.id))}>Edit</button>
            <button onClick={() => dispatch(deletePost(comment.id)).then(() => setIsLoaded(false)).then(() => dispatch(getOnePost(postId.id))).then(() => setIsLoaded(true))}>Delete</button>
            </div>
            )}
        </div>
    ))
  }

  return (
    <>

      <div className="individual_post_container">
        <div className="individual_post_image_container">
          <img src={post?.image_url} alt="post" />
        </div>
        <div className="individual_post_caption_container">
          <p>{post?.caption}</p>
        </div>
        <div>
          <div className="add_comment_btn">
            <button onClick={addComment}>
              <i class="fa-solid fa-plus"></i>
            </button>

          </div>
          <CommentsDiv postId={post?.id}/>
        </div>
      </div>
    </>
  );
}

export default PostIdPage;
