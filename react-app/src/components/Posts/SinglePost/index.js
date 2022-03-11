import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePost } from "../../../store/posts";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
  getComment,
} from "../../../store/comments";
import './SinglePost.css'
import './PostIdPage.css'
import { Modal } from "../../../context/Modal";



function SinglePost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state?.posts?.post);
  const postId = useParams();
  const id = postId.id;
  const user = useSelector((state) => state?.session?.user);
  const [loaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [editContent, setEditContent] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [editModal, showEditModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        dispatch(getOnePost(id)),
    dispatch(getComments(id))
      ])
      setIsLoaded(true);
    }
    fetchData();
    if(!loaded) {
      fetchData();
    }

  }, [dispatch, loaded, errors, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post_id = postId.id;

    const newComment = {
      content,
      post_id,
    };

    if (newComment) {
      const data = await dispatch(addComment(newComment));
       setContent("");

      if (data) {
        setErrors(data);
      }
    }
  };


  const openEdit = async (id) => {
    await dispatch(getComment(id));

    setEditCommentId(id);

    showEditModal(true);
  };

  const [content, setContent] = useState("");

  const handleDelete = async (id) => {
    const postId = post.id;
    await dispatch(deleteComment(id));
    await dispatch(getComments(postId));
    setIsLoaded(false)

  };

  const handleEdit = async () => {
    const comment_id = editCommentId;
    const post_id = post.id;
    const content = editContent;

    const editedComment = {
      id: editCommentId,
      comment_id,
      post_id,
      content,
      user_id: user.id,
    };

    const data = await dispatch(editComment(editedComment));
    if (data) {

        setErrors(data);

      } else {

          await dispatch(getComments(post_id));


      }
  };



  // useEffect(() => {
  //   async function fetchComments() {
  //     if (!loaded) await dispatch(getComments(id));
  //   }
  //   fetchComments();
  // }, [dispatch, loaded, id]);

  return (
    <>
      <div className="home_feed_container">
        <div className="post_content">
          <div className="back_button">
            <button
              className="white_link"
              onClick={() => history.push("/posts")}
            >
              Back to Posts
            </button>
          </div>
          <div className="individual_post_container">
            <div className="post_header_profileid">
              <div className="header_profile_img">
                <img className="post_header_image" src={post?.user_profile_image} alt="profile_pic" />{" "}
              </div>
              <div
                className="header_username"
                key={post?.username}
                id="post_username"
              >
                {post?.username}
              </div>
            </div>
            <div className="individual_post_image_container">
              <img className="post_img"  src={post?.image_url} alt="post" />
            </div>
            <div className="individual_post_caption_container">
              <p>{post?.caption}</p>
            </div>
          </div>
          <div className="individual_post_container">
            <div className="add_comment_container">
              <div className="auth_errors">
                {!errors.length ? null : (
                  <div>
                    {errors.map((error) => (
                      <div key={error}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
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

          {!post.comments ? (
            <>
              <div className="comment_list_container">
                <div className="comment_list_header">
                  No comments for this post yet..be the first to leave your
                  thoughts!{" "}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="comment_list_container">
                <div className="comment_list" id="comments">
                  {post.comment_list.map((comment) => (
                    <>
                      <div className="individual_comment_container">
                        <span className="comment_username">
                          {comment.username}
                        </span>
                        {comment.content}
                        <div className="comment_options">
                          {user.id !== comment.user_id ? null : (
                            <>
                              <div className="option_btns">
                                <button
                                  comment={comment}
                                  onClick={() =>
                                    openEdit(comment.id).then(() =>
                                      setEditContent(comment.content)
                                    )
                                  }
                                  value={comment.id}
                                >
                                  Edit
                                </button>
                                <button
                                  id={comment.id}
                                  post={comment.post_id}
                                  onClick={(e) => handleDelete(e.target.id)}
                                >
                                  Delete
                                </button>
                              </div>
                              {editModal && (
                                <Modal
                                  comment_id={comment?.id}
                                  onClose={() => showEditModal(false)}
                                >
                                  <div className="modal_content">
                                    <div className="edit_heading_container">
                                      <h1 className="edit_cmt_heading">
                                        Edit Your Comment
                                      </h1>
                                    </div>
                                    <div className="edit_comment_container">
                                      <form
                                        id={comment?.id}
                                        onSubmit={(e) =>
                                          handleEdit(e.target.id)
                                        }
                                      >
                                        <input
                                          className="edit_comment_textarea"
                                          type="text"
                                          name="content"
                                          value={editContent}
                                          onChange={(e) =>
                                            setEditContent(e.target.value)
                                          }
                                        />
                                        <div className="option_btns">
                                          <button
                                            disabled={editContent === ""}
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                          <button
                                            onClick={() => showEditModal(false)}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </Modal>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
