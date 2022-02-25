import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePost, editPost, deletePost } from "../../../store/posts";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
  getComment,
} from "../../../store/comments";

import { Modal } from "../../../context/Modal";


function SinglePost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state?.posts?.posts);
  const postId = useParams();
  const id = postId.id;
  const user = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => state?.comments?.comments);
  const [loaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState("");

  const [editContent, setEditContent] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [editModal, showEditModal] = useState(false);

  useEffect(async () => {
    await dispatch(getOnePost(id));
    await dispatch(getComments(id));
    setIsLoaded(true);
  }, [dispatch, loaded, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post_id = postId.id;

    const newComment = {
      content,
      post_id,
    };

    if (newComment) {
      await dispatch(addComment(newComment));
      setContent("");
      setIsLoaded(false);
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
    setIsLoaded(false);
  };

  const handleEdit = async (id) => {
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

    await dispatch(editComment(editedComment));

    setEditContent("");
    showEditModal(false);
    setIsLoaded(false);
  };

  useEffect(async () => {
    if (!loaded) await dispatch(getComments(id));
  }, [comments, editContent]);

  if (!loaded) {
    return null;
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
              <div className="individual_post_container" id="comments">
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
                                  <h1 className="edit_cmt_heading">Edit Your Comment</h1>
                                </div>
                                <div className="edit_comment_container">
                                  <form
                                    id={comment?.id}
                                    onSubmit={(e) => handleEdit(e.target.id)}
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
                                      <button type="submit">Save</button>
                                      <button onClick={() => showEditModal(false)}>Cancel</button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </Modal>
                          )}
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
