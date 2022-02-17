import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, Redirect, useParams} from 'react-router-dom';
import {editPost} from '../../../store/posts';

function EditPost(){
  const dispatch = useDispatch( );
  const history = useHistory();
  const user = useSelector((state) => state?.session?.user);
  const post = useSelector((state) => state?.posts?.post);
  const postId = useParams();
  const [image_url, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const categories = useSelector((state) => state?.categories?.categories);

  useEffect(() => {

})

return (
  <>
  <div>
    HELLO
  </div>
  <h2> Placeholder for Edit FORM!!! </h2>
  </>
)
}

export default EditPost;
