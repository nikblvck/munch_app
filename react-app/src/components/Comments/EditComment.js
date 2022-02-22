import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editComment} from '../../store/comments';
import {getOnePost} from '../../store/posts';
import '../Posts/PostForm.css';


export default function EditComment({comment}) {

  const dispatch = useDispatch();
  const comment = useSelector((state) => state?.comments?.comments[comment.id])
  const [content, setContent] = useState(comment.content);

  const handleEdit = async (e) => {
    e.preventDefault();

    const editedComment = {
      id: comment.id,
      content,
      postId: comment.post_id,
      userId: comment.user_id,
    }

    if (editedComment) {
      dispatch(editComment(editedComment))
      setShowEdit(false);
    }
  }

  return (
    <>
    <div>
      <div className="edit form">
        <form>
          <input
          type='textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleEdit} type="submit" disabled={!content}> Save </button>
        </form>
      </div>
    </div>
    </>
  )


}
