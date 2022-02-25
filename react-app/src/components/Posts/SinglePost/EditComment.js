import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom'
import {editComment, getComment} from '../../../store/comments';



export default function EditComment({ commentId, postId, setShowEditModal }) {
 console.log(commentId)
  const dispatch = useDispatch();
  const history = useHistory();
  const comment = useSelector((state) => state?.comments?.comments.find((comment) => comment.id === commentId));
const id = comment.id;
  const [isLoaded, setIsLoaded] = useState(false);
console.log(id)
  useEffect(async () => {
    await dispatch(getComment(id))
    setIsLoaded(true)
  }, [dispatch, id, isLoaded]);

 console.log(comment)

  //  const comment = useSelector((state) => state?.comments?.comments.find(comment => comment.id === commentId));

   const [content, setContent] = useState(comment.content);



  const handleEdit = async (e) => {
    e.preventDefault();


    const post_id = comment.post_id;
    const comment_id = comment.id;
    const editedComment = {
      content,
      post_id,
      comment_id,
    }

    if (editedComment) {
      console.log('=======================')
      console.log(editedComment)
      console.log(comment.id)
       await dispatch(editComment(editedComment))

       await dispatch(getComment(commentId))
       history.push(`/posts/${post_id}`)
        setShowEditModal(false)
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
