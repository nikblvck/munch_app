import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePost, editPost} from "../../../store/posts";
import { getCategories } from "../../../store/categories";
import '../PostForm.css'


function EditPostPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = useParams();
  const post = useSelector((state) => state?.posts?.post);
  const user = useSelector((state) => state?.session?.user);
  const [image_url, setImage_url] = useState(post?.image_url || '');
  const [caption, setCaption] = useState(post?.caption || '');
  const [category_id, setCategoryId] = useState(post?.category_id || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const categories = useSelector((state) => state?.categories);
  const categoriesArray = Object?.values(categories)

  useEffect(() => {

    async function fetchData() {
      await dispatch(getOnePost(postId.id));
      await dispatch(getCategories());
      setIsLoaded(true);
    }
    fetchData();
  }, [dispatch, postId, isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedPost = {
      id: postId.id,
      image_url,
      caption,
      category_id,
      user_id: user.id,
    };

    if (editedPost) {
      const data = await dispatch(editPost(editedPost));
      if (data) {

        setErrors(data);

      } else {
      await dispatch(getOnePost(postId.id));
    }
    }
  };

  useEffect(() => {
    if(post) {
      setImage_url(post.image_url);
      setCaption(post.caption);
      setCategoryId(post.category_id);
    }
  }, [post]);



  return (
    <>
      <div className="home_feed_container">
        <div className="post_form_container">
        <div className="post_form_header">
          <p>Edit Post</p>
        </div>
        <div className="post_form_content">
          <div className="post_form_image">
            <img
              src={post?.image_url}
              alt={caption}
              className="post_form_image"
            />
          </div>
          <div className="post_form_inputs">
            <div className="form_errors">
              {!errors.length ? null : (
                <div>
                  {errors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            <form className="post_form" onSubmit={handleSubmit}>
              <label htmlFor="image_url">Image URL</label>
              <input
                type="text"
                name="image_url"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
              <label htmlFor="caption">Caption</label>
              <input
                className="caption_input"
                type="textarea"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <label htmlFor="category_id">Category</label>
              <select
                className="category_select"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option> --Select a Category-- </option>
                {categoriesArray?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="new_post_btns">
                <button className="delete_btn" type="submit "> Save</button>
                <button className="delete_btn" type="cancel" onClick={() => history.push("/posts")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default EditPostPage;
