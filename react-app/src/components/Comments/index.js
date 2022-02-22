import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '../../store/comments';

function CommentsDiv({postId}){
  console.log(postId);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getComments(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

 const comments = useSelector((state) => state?.comments?.comments);

  return (
    <>
    <div className='comments_div_container'>
       {comments?.map((comment) => (
         <div className="individual_comment">
            <b>{comment.username}</b> {comment.content}
         </div>
       ))}
    </div>

    </>
  )
}


export default CommentsDiv;
