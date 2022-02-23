import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {editComment, getComment} from '../../store/comments';
import '../Posts/PostForm.css';


export default function EditComment({commentId}) {
  console.log(commentId)
  const dispatch = useDispatch();


  const [currentComment, setCurrentComment] = useState({})
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getComment(commentId)).then(() => setIsLoaded(true));
  }, [dispatch, commentId, isLoaded]);



   const comment = useSelector((state) => state?.comments?.comments.find(comment => comment.id === commentId));
   const [content, setContent] = useState(comment.content);

   console.log(comment)

  const handleEdit = async (e) => {
    e.preventDefault();
    const id = commentId;

    const post_id = comment.post_id;

    const editedComment = {
      content,
      post_id,
    }

    if (editedComment) {
      console.log(editedComment)
       await dispatch(editComment(editedComment))

    }
  }

  return (
    <>
      {
        (commentId = comment.id && (
          <div className="edit_comment_container">
            <div className="edit form">
              <form>
                <input
                  type="textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleEdit} type="submit" disabled={!content}>
                  Save
                </button>
              </form>
            </div>
          </div>
        ))
      }
    </>
  );


}
