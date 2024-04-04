import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Define Posts component
const Posts = () => {
  //Fetching URL parameters
  const params = useParams();
  const dispatch = useDispatch();
  // Fetching data from Redux store
  const  user  = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

   // Fetch timeline posts when component mounts or user ID changes
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

 // Ensure posts is an array
  if (!Array.isArray(posts)) {
    posts = [];
  }
// Filter posts by user ID if specified in URL params
  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className="ContentContainer">

    <div className="PostsContainer">
      {loading ? (
        "Fetching posts...."
        ) : (
          posts.map((post, id) => <Post data={post} key={id} />)
          )}
          </div>
    </div>
  );
};

export default Posts;
