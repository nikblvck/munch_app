import {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import { addPost } from '../../../store/posts';
import { getCategories } from '../../../store/categories';
function NewPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);
  const [image_url, setImage_url] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const categories = useSelector((state) => state?.categories?.categories);
  console.log(categories);
  useEffect(() => {
   dispatch(getCategories()).then(() => setIsLoaded(true));

  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      image_url,
      caption,
      category: +category,
      user_id: user.id,
    }
    console.log(newPost)
    if (newPost) {
      dispatch(addPost(newPost)).then(() => {
        history.push('/posts');
      });
    } else {
      setErrors(['Please fill out all fields']);
    }
  };

  if (!isLoaded) {
    return null
  }
return (
  <>
    <div className="post_form_container">
      <div className="post_form_header">
        <p>New Post</p>
      </div>
      <div className="post_form_content">
        <div className="post_form_image">
          <img src={image_url} alt={caption} className="post_form_image" />
        </div>
        <div className="post_form_inputs">
          <div className="form_errors">
            {!errors.length ? null : (
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
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
              type="text"
              name="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <label htmlFor="category">Category</label>
            <select className="category_select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
            </select>

            <button type="submit "> Save</button>
            <button type="cancel" onClick={() => history.push("/posts")}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
);

}

export default NewPost;
