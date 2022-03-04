import {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCategories, getCategory } from "../../store/categories";

function CategoryPage() {
  const dispatch = useDispatch();
  const category_name  = useParams().id;
  console.log(category_name)
  const category = useSelector((state) =>
  state?.categories?.category)
  const posts = category?.posts
    useEffect(() => {
			async function fetchData() {
				dispatch(getCategories());
				dispatch(getCategory(category_name));
			}
			fetchData();
		}, [dispatch, category_name]);


  return (
    <>
    <div className="home_feed_container">
      <div className="post_content">
        {posts?.map((post) => (
          <>
            <div className="individual_post" id="category">
              <div className="post_header">
              </div>
              <div className="post_image" key={post?.image_url}>
                <img src={post?.image_url} alt={post?.title} className="post_image" />
                </div>
                </div>
                </>
                ))}
      </div>
    </div>
    </>
  )
}

export default CategoryPage;
