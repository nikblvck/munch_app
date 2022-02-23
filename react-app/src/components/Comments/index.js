import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getComments} from '../../store/comments';
import {getOnePost, editPost, deletePost} from '../../store/posts';
import EditComment from './EditComment';
import { addComment, editComment, deleteComment} from '../../store/comments'
import {Modal} from '../../context/Modal'

function CommentsDiv({postId}){
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state?.session?.user);
  const post = useSelector((state) => state?.posts?.posts);
  const [comment, setComment] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');


  useEffect(() => {
    dispatch(getComments(postId)).then(()=> getOnePost(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

 const comments = useSelector((state) => state?.comments?.comments);

//  useEffect(() =>
//  {
//     if (!comments) {
//       setIsLoaded(false);
//     }
//     else {
//       setIsLoaded(true);
//     }
//  }, [comments]);

const handleDelete = async (id) => {
  console.log(id)
  await dispatch(deleteComment(id))
  await dispatch(getComments(postId))
};



const openEdit = (e) => {
  e.preventDefault();
  setComment(e.target.value);
  setShowEdit(true);
};

  return (
    <>
      {isLoaded && (
        <div className="comments_div_container">
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
      )}
    </>
  );
}


// () => dispatch(editComment(comment.id))
export default CommentsDiv;
