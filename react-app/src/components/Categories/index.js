import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import { getPost } from "../../store/posts";
import { getCategory, getCategories } from "../../store/categories";
import './Categories.css'


function CategoryIdPage() {

  const dispatch = useDispatch();
  const categoryId = useParams();
  const id = categoryId.id;
  const user = useSelector((state) => state?.session?.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const postsArray = useSelector((state) => state?.categories?.category)
  const postArrayLength = postsArray?.length;
  const categoryName = useSelector((state) => state?.categories?.category?.name);
  console.log(postsArray?.length)
  useEffect(async () => {
      await dispatch(getCategories());
      await dispatch(getCategory(id))
      setIsLoaded(true)
  }, [dispatch, id, postArrayLength]);

  if (postArrayLength === 0 || !isLoaded) {
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
