import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getOnePost, editPost, deletePost} from "../../../store/posts";
import {getCategories} from "../../../store/categories";
import {getComments} from "../../../store/comments";


function PostIdPage () {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = useParams();
  console.log(postId)
  const post = useSelector((state) => state?.posts?.posts);
  const user = useSelector((state) => state?.session?.user);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOnePost(postId.id)).then(()=> getComments(postId.id)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

  console.log(post?.comment_list)
  return (
    <>
    <div className="individual_post_container">
      <div className="individual_post_image_container">
        <img src={post?.image_url} alt="post"/>
      </div>
      <div className="individual_post_caption_container">
        <p><b>{post.username}</b> {post?.caption}</p>
      </div>
      <div>
      {post?.comment_list.map((comment) => (
        <div className="individual_post_comment_container">
          <p><b>{comment.username}</b> {comment.content}</p>
          </div>
      ))}
      </div>
      </div>
    </>
  );
}

export default PostIdPage;
