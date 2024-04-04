
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments,deleteComment } from "../../actions/CommentAction";
import { getPostById } from "../../actions/PostAction";
import "./Comment.css";
import { useParams } from "react-router-dom";
import CommentShare from "../CommentShare/CommentShare";

//Comment component to display comments for a post and handle comment deletion
const Comment = () => {
    const dispatch = useDispatch();
    const { id: postId } = useParams(); // Extracting postId from URL params
    const user = useSelector((state)=> state.userInfoReducer);
    const userId = user.user?._id;

    //Retrieving comments and post details from Redux store    
    const { comments, loading, error } = useSelector(state => state.commentReducer);
    const post = useSelector((state)=> state.postReducer.posts);


    //Fetch post details when component mounts or postId changes
    useEffect(()=>{
        dispatch(getPostById(postId));
    },[dispatch,postId]);


    //Handler for deleting a comment
    const deleteCommentHandler =  (commentId) => {
        console.log(`${commentId} commentId ${postId} postId ${userId} userId`);
        if (window.confirm('Are you sure you want to delete this comment?')) {
            // Dispatch the delete comment action, passing the comment ID, userId,postId
             dispatch(deleteComment(commentId, userId, postId));
        }
    };

    //Base URL for server public folder
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    //Fetch comments when postId changes
    useEffect(() => {
        if (postId) {
            dispatch(getAllComments(postId));
        }
    }, [dispatch, postId]);

    // Define a safe way to access nested properties
    const safeComments = comments?.map(comment => ({
        ...comment,
        authorInfo: comment.authorInfo || { firstName: 'Unknown' } // Provide defaults for missing data
    })) || [];

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      
    return (
        <div className="CommentSingleContainer">
            {/* Display loading or error messages */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
             {/* Display comments */}
            <ul>
                {safeComments.map((comment) => (
                    <li key={comment._id} className="profilePostContainer CommentList">
                       
                        <div className="commentUserDisplay">
                            {/* Display comment author's profile picture */}
                           
                        <img className=""
        src={
            comment.authorInfo.profilePicture
            ? serverPublic + comment.authorInfo.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
        />
                         {/* Display comment author's name */}
                         <p className="user">
                         {comment.authorInfo.firstName}: 
                        </p>
                         {/* Display comment text */}
                        <p >
                         {comment.text}
                        </p>
        </div>
                           {/* Display delete button for comment author or post owner */}
                        {userId && (userId === comment.author || userId === post?.userId) && (
                            <button className="btn deleteButton" onClick={() => deleteCommentHandler(comment._id)}>Delete</button>
                        )}
                       
                    </li>
                ))}
            </ul>
            <hr/>
            {/* Render comment share component */}
            <div className="ShareComment">
                <CommentShare/>
            </div>
        </div>
    );
};

export default Comment;
