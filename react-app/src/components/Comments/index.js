import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '../../store/comments';
import {getOnePost, editPost, deletePost} from '../../store/posts';


function CommentsDiv({postId}){
  console.log(postId);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const post = useSelector((state) => state?.posts?.posts);

  useEffect(() => {
    dispatch(getComments(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

 const comments = useSelector((state) => state?.comments?.comments);

  return (
    <>
      <div className="comments_div_container">
        {comments?.map((comment) => (
          <div className="individual_comment">
            <b>{comment.username}</b> {comment.content}
            {user?.id === comment?.user_id && (
              <div className="edit_delete_container">
                <button onClick={() => dispatch(editPost(comment.id))}>
                  Edit
                </button>
                <button
                  onClick={() =>
                    dispatch(deletePost(comment.id))
                      .then(() => setIsLoaded(false))
                      .then(() => dispatch(getOnePost(postId.id)))
                      .then(() => setIsLoaded(true))
                  }
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


export default CommentsDiv;
