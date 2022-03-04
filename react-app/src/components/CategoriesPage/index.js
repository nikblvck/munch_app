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

    useEffect(() => {
			async function fetchData() {
				dispatch(getCategories());
				dispatch(getCategory(category_name));
			}
			fetchData();
		}, [dispatch, category_name]);
 console.log(category)

  return (
    <>
    <div className="home_feed_container">
      <div className="post_content">
      </div>
    </div>
    </>
  )
}

export default CategoryPage;
