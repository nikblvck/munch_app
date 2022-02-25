import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getComments} from '../../store/comments';
import {getOnePost, editPost, deletePost} from '../../store/posts';
import EditComment from '../Posts/SinglePost/EditComment';
import { addComment, editComment, deleteComment} from '../../store/comments'
import {Modal} from '../../context/Modal'

function CommentsDiv({postId, loaded}){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state?.session?.user);
  const post = useSelector((state) => state?.posts?.posts);
  const [showEdit, setShowEdit] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  const user_id = user.id;
  const post_id = postId;
  const newComment = {
    content,
    post_id,
    user_id,
  };

  if (newComment) {

    await dispatch(addComment(newComment))
    await dispatch(getComments(postId.id))

  }
};

const handleDelete = async (id, post) => {

  await dispatch(deleteComment(id));

  await dispatch(getComments(post.id));
};

const openEdit = (e) => {
  e.preventDefault();
  setShowEdit(true);
};


  useEffect(async() => {
    await dispatch(getComments(postId.id))
    await dispatch(getOnePost(postId.id))
    setIsLoaded(true)
  }, [dispatch, loaded]);


 const comments = useSelector((state) => state?.comments?.comments);
 const [content, setContent] = useState("");




  return (
    <>
      <div className="comments_div_container">
        <div className="add_comment_container">
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
        </div>
        {comments?.map((comment) => (
          <div className="individual_comment">
            <b>{comment.username}</b> {comment.content} {comment.id}
            {user?.id === comment?.user_id && (
              <div className="edit_delete_container">
                <button onClick={openEdit}>Edit</button>
                <button
                  id={comment.id}
                  onClick={(e) => handleDelete(e.target.id)}
                >
                  Delete
                </button>
                {showEdit && <EditComment commentId={comment.id} />}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}



export default CommentsDiv;
