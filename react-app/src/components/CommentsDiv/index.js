import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getComments, editComment, deleteComment} from '../../store/comments';

function CommentsDiv({postId, loaded}) {
  console.log([loaded, postId])
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  useEffect((postId) => {
    dispatch(getComments(postId))


  }, [dispatch]);

  const comments = useSelector((state) => state?.comments?.comments);

  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  }


  return (
    <>
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
      <div className="comments_div_container">PLACEHOLDER</div>
    </>
  );
}

export default CommentsDiv;
