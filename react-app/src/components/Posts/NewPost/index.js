import {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import { addPost } from '../../../store/posts';
import { getCategories } from '../../../store/categories';





function NewPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);
  const [images, setImages] = useState('');
  const [caption, setCaption] = useState('');
  const [hasCategories, setHasCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const categories = useSelector((state) => state?.categories?.categories);
 console.log(images)

  useEffect(() => {
   dispatch(getCategories()).then(() => setIsLoaded(true));

  }, [dispatch, isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      images,
      caption,
      categories,
      user_id: user.id,
    };
    if (newPost) {
      const data = await dispatch(addPost(newPost));
      if (data) {
 ;
        setErrors(data);

      } else {
        history.push('/posts');
      }
    }
  };


return (
  <>
    <div className="main_container">
      <div className="post_form_container">
      <div className="post_form_header">
        <p>New Post</p>
      </div>
      <div className="post_form_content">
        <div className="post_form_image">
          <img src={images} alt={caption} className="post_form_image" />
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
            <label htmlFor="image_url">Image URL *</label>
            <input
              type="file"
              name="images"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              multiple
              required
            />
            <label htmlFor="caption">Caption</label>
            <input
              className="caption_input"
              type="text"
              name="caption"
              value={caption}
              placholder="Caption [optional]"
              onChange={(e) => setCaption(e.target.value)}
            />
            <label htmlFor="category_id">Category *</label>
            <select
              className="category_select"
              value={hasCategories}
              onChange={(e) => setHasCategories(e.target.value)}
            >
              <option > --Select a Category-- </option>
              {categories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
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

export default NewPost;
