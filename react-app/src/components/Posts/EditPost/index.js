import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom'
import { getOnePost, editPost } from '../../../store/posts';


function EditPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);
  const post = useSelector((state) => state?.posts?.post?.id);
  const { id} = useParams();
  const postId = +id;
  const [image_url, setImage_url] = useState(post?.image_url);
  const [caption, setCaption] = useState(post?.caption);
  const [category, setCategory] = useState(post?.category);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOnePost(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

  if (!isLoaded) {
    return null
  }

  return (
    <>
      <div className="post_form_container">
        <div className="post_form_header">
          <p>Edit Post</p>
          </div>
        <div className="post_form_content">
          <div className="post_form_image">
            <img
              src={image_url}
              alt={caption}
              className="post_form_image"
            />
          </div>
          <div className="post_form_inputs">
            <div className="form_errors">
              {errors.length &&
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
              }
            </div>
            <form className="post_form">
              <label htmlFor="image_url">Image URL</label>
              <input
              type="text"
              name="image_url"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
              />
              <label htmlFor="caption">Caption</label>
              <input
              type="text"
              name="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              />
              <label htmlFor="category">Category</label>
              <input
              type="number"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              />
              <button type="submit "> Save</button>
              <button type="cancel" onClick={() => history.push('/posts')}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPost;
