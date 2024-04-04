import React, { useEffect, useState } from 'react';
import './SingleDisplayPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Link,useNavigate} from "react-router-dom";
import { getPostById,deletePost } from '../../actions/PostAction';
import Comment from '../Comment/Comment';

//Define the SingleDisplayPost component
const SingleDisplayPost = ({data}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    //Fetching post data from Redux store
    const post = useSelector((state)=> state.postReducer.posts);
    const user = useSelector((state)=> state.userInfoReducer.user);
    const deleting = useSelector((state)=>state.postReducer.deleting);
    //Base URL for server public folder
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        // Fetch post by ID when component mounts or ID changes
        dispatch(getPostById(id));
    },[dispatch,id]);

    useEffect(()=>{
        // Navigate to home page after deleting post
        if(deleting){
            navigate('/home');
        }
    },[deleting, navigate])

     // Function to handle post deletion
    const deletePostHandler = () => {
        if(window.confirm("Are you sure you want to delete this post?")){
            dispatch(deletePost(id,user._id));
        }
    }

    return(
        <div className='SingleDisplay DisplayFlexCenterColumn'>
            {post ?(
               <div className='infoContainer'>
                <div className='info'>
                {/* Display post image */}
                <img className='singleImage' src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image: ''} alt=""
                />
                 {/* Display delete button if user is the author */}
                {user && (user._id === post.userId) && (
                            <button className='btn deleteButton' onClick={ deletePostHandler}>Delete Post</button>
                        )}
                 {/* Button to go back to home page */}
                <Link to ={"/home"}>
                    <button className='btn outlineBtn'>Go back btn</button>
                </Link>
                </div>
           {/* Display post author information and description */} 
                <div className='CommentSection'>
                    <div className='profilePostContainer'>
                      
                <img className="profilePostImg"
        src={
            post?.authorInfo?.profilePicture
            ? serverPublic + post?.authorInfo?.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
            

                 <p className='commentOverflow'>{post?.authorInfo?.firstName} | {post.desc}</p>
                 </div>

                  <hr/>
                {/* Display comment section */}
                 <div className='CommentMainContainer'>
                    <Comment/>
                </div>

                    </div>
                </div>
        ):(
            <p>Loading...</p>
          )
            }
        </div>
    )
}

export default SingleDisplayPost;