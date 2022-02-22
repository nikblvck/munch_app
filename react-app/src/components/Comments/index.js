import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '../../store/comments';
import {getOnePost, editPost, deletePost} from '../../store/posts';
import {editComment, deleteComment} from '../../store/comments'
import {Modal} from '../../context/Modal'

function CommentsDiv({postId}){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const post = useSelector((state) => state?.posts?.posts);
  const [comment, setComment] = useState('');
  const [showEdit, setShowEdit] = useState(false);
 

  useEffect(() => {
    dispatch(getComments(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

 const comments = useSelector((state) => state?.comments?.comments);


const handleDelete = (commentId) => {
  dispatch(deleteComment(commentId))
  .then(() => setIsLoaded(false))
}


 const openEdit = (e) => {
   e.preventDefault();
   setComment(e.target.value);
    setShowEdit(true);
 }

  return (
    <>
      <div className="comments_div_container">
        {comments?.map((comment) => (
          <div className="individual_comment">
            <b>{comment.username}</b> {comment.content}
            {user?.id === comment?.user_id && (
              <div className="edit_delete_container">
                <button onClick={openEdit}>
                  Edit
                </button>
                <button
                commentId={comment.id}
                onClick={(e) => handleDelete(e.target.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}


// () => dispatch(editComment(comment.id))
export default CommentsDiv;
