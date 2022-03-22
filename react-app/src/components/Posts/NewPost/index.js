import {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import { addPost } from '../../../store/posts';
import { getCategories } from '../../../store/categories';
import './NewPost.css'





function NewPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);
  const [image, setImage] = useState([]);
  const [caption, setCaption] = useState('');
  const [category_id, setCategoryId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false)
  const categories = useSelector((state) => state?.categories);
  const categoriesArray = Object?.values(categories)

  useEffect(() => {
   dispatch(getCategories()).then(() => setIsLoaded(true));

  }, [dispatch, isLoaded]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    image,
    caption,
    category_id,
  }
  console.log(formData)
  //AWS uploads can be slow-displaying, loading message is a good idea to show user something is happening
  setImageLoading(true);
  const res = await fetch('/api/posts/new', {
    method: 'POST',
    body: formData,
  });
  if (res.ok) {
    await res.json();
    setImageLoading(false);
    history.push('/posts');
  } else {
    setImageLoading(false);
    console.log("an error has occurred");
  }
}

const updateImage = (e) => {
  const file = e.target.files[0];
  console.log(file)
  setImage(file)
}

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newPost = {
//       images,
//       caption,
//       category_id,
//       user_id: user.id,
//     };
//     if (newPost) {
//       const data = await dispatch(addPost(newPost));
//       if (data) {
//  ;
//         setErrors(data);

//       } else {
//         history.push('/posts');
//       }
//     }
//   };


return (
  <>
    <div className="home_feed_container">
      <div className="post_form_container">
      <div className="post_form_header">
        <p>New Post</p>
      </div>
      <div className="post_form_content">
        {/* <div className="post_form_image">
          <img src={image_url} alt={caption} className="post_form_image" />
        </div> */}

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
            <label htmlFor="image_url">Images *</label>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
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
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option > --Select a Category-- </option>
              {categoriesArray?.map((category) => (
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
