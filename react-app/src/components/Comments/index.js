import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '../../store/comments';

function CommentsDiv(postId){
  console.log(postId);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const id = postId.postId
  console.log(id)
  useEffect(() => {
    dispatch(getComments(id)).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);



  return (
    <>
    <div className='comments_div_container'>
      <h1> Comments Div Placeholder</h1>

    </div>
    </>
  )
}


export default CommentsDiv;
