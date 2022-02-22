import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getOnePost, editPost, deletePost} from "../../../store/posts";
import {getComments} from "../../../store/comments";
import CommentsDiv from "../../Comments";
import {Modal} from "../../../context/Modal";
import './PostIdPage.css'

function PostIdPage () {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = useParams();
  console.log(postId)
  const post = useSelector((state) => state?.posts?.posts);
  const user = useSelector((state) => state?.session?.user);
  const [loaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState('')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getOnePost(postId.id)).then(()=> getComments(postId.id)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);



  const addComment = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  const handleAdd = () => {

    const comment = {
      content,
      post_id: postId.id,
      user_id: user.id,
    }
    if (comment) {
      dispatch(addComment(comment))
      setShowModal(false);
    }
  }




  return (
    <>
      <div className="individual_post_container">
        <div className="individual_post_image_container">
          <img src={post?.image_url} alt="post" />
        </div>
        <div className="individual_post_caption_container">
          <p>{post?.caption}</p>
        </div>
        <div>
          <div className="add_comment_btn">
            <button onClick={addComment}>
              {" "}
              <i class="fa-solid fa-plus"></i>
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <div>
                  Add Comment
                  <div>
                    <form onSubmit={handleAdd}>
                      <input
                        type="textarea"
                        placeholder="Add Comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <CommentsDiv postId={post?.id} />
        </div>
      </div>
    </>
  );
}

export default PostIdPage;
