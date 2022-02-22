import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getComments} from '../../store/comments';
import {getOnePost, editPost, deletePost} from '../../store/posts';
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
    dispatch(getComments(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

 const comments = useSelector((state) => state?.comments?.comments);


const handleDelete = (id) => {
  console.log(id)
  dispatch(deleteComment(id)).then(() => setIsLoaded(false));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newComment = {
    content,
    post_id: postId.id,
    user_id: user.id,
  }
  console.log(newComment)
  if(newComment) {
    dispatch(addComment(newComment))
    .then(() => history.push(`/posts/${postId.id}`))
  }
}

  const addComment = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

const openEdit = (e) => {
  e.preventDefault();
  setComment(e.target.value);
  setShowEdit(true);
};


  return (
    <>
      <div className="comments_div_container">
        <button >
          <i class="fa-solid fa-plus"></i>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div>
                Add Comment
                <div>
                  <form>
                    <input
                      type="textarea"
                      placeholder="Add Comment"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={handleSubmit} type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </Modal>
          )}
        </button>

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
