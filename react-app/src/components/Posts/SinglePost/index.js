
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePost, editPost, deletePost } from "../../../store/posts";
import { getComments, addComment, editComment, deleteComment } from "../../../store/comments";
import CommentsDiv from "../../Comments";

function SinglePost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state?.posts?.posts)
  const postId = useParams()
  const id= postId.id
  const user = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => state?.comments?.comments);
  const [loaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState('');
  const [content, setContent] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  // console.log(post)
  // console.log(comments)
  // console.log(id)
  useEffect(async () => {

    await dispatch(getOnePost(id))
    await dispatch(getComments(id))
    setIsLoaded(true)
  }
    , [dispatch, loaded, errors]);


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const postId = post.id;
  //   console.log(postId)
  //   const newComment = {
  //     content,
  //     post_id: postId,
  //   };

  //   if (newComment) {
  //     console.log(newComment)
  //     await dispatch(addComment(newComment));
  //     setIsLoaded(false);
  //   } else {
  //     setErrors("Please enter a comment");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = user.id;
    const post_id = postId.id;
    console.log(post_id)
    const newComment = {
      content,
      post_id,
    };

    if (newComment) {
      await dispatch(addComment(newComment));
      setContent('')
      setIsLoaded(false);
    }
  };
const openEdit = (e) => {
  e.preventDefault();
  setShowEdit(true);
};

const handleDelete = async (id) => {
  console.log(post)
  const postId= post.id
  await dispatch(deleteComment(id))
  await dispatch(getComments(postId))
  setIsLoaded(false)
};



useEffect(async() => {
  if(!loaded)
  await dispatch(getComments(id))
}, [comments]);


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
        </div>
        <div className="individual_post_container">
          <div className="add_comment_container">
            <form onSubmit={handleSubmit}>
              <textarea
                className="add_comment_textarea"
                name="comment"
                placeholder="Add a comment..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <div className="option_btns">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          {!loaded ? null : (
            <>
              <div className="individual_post_container">
                {post.comment_list.map((comment) => (
                  <>
                    <div className="individual_comment_container">
                      <span className="comment_username">
                        {comment.username}
                      </span>{" "}
                      {comment.content}
                    </div>
                    <div className="comment_options">
                      {user.id !== comment.user_id ? null : (
                        <>
                          <button onClick={openEdit}>Edit</button>
                          <button
                            id={comment.id}
                            post={comment.post_id}
                            onClick={(e) => handleDelete(e.target.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
