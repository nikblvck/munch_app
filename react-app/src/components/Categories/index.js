import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { getCategory, getCategories } from "../../store/categories";
import './Categories.css'


function CategoryIdPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const categoryId = useParams();
  const id = categoryId.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const postsArray = useSelector((state) => state?.categories?.category)
  const postArrayLength = postsArray?.length;

  useEffect(async () => {

      await dispatch(getCategories());
      await dispatch(getCategory(id))
      setIsLoaded(true)


  }, [dispatch, id, postArrayLength]);

  useEffect(async() => {

       if(!isLoaded) {
        await dispatch(getCategories())
        await dispatch(getCategory(id));
        await setIsLoaded(true);
      }
  }, [isLoaded]);

  
  const handleBack = (e) => {
    e.preventDefault();
    history.push('/posts')
  }

  if (!postArrayLength) {
    return (
      <>
      <div className="main_container">
        <h1 className="none_yet">No posts in this category yet, check back later!</h1>
      </div>
      </>
    );
  }

return (
  <>
    <div className="main_catgory_container">
      <div className="back_button">
        <button onClick={handleBack}>Back</button>
        </div>
      <div>
        <h1 className="category_title">{postsArray[0]?.category_name}</h1>
      </div>
      <div className="posts_container">
       {postsArray?.map((post) => (
          <>
            <div className="post_container">
              <img className="post_image_categories" src={post.image_url} alt={post.category_name}/>

              <div className="post_title">{post.category_name}</div>  <br/>
           </div>
           </>
        ))}
      </div>

    </div>
  </>
)

}


export default CategoryIdPage;
