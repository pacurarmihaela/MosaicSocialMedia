import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment } from '../../actions/CommentAction';

//CommentShare component to allow users to create and share comments
const CommentShare = () =>{
   const dispatch = useDispatch();

   //Retrieve user information from Redux store
   const user = useSelector((state)=> state.userInfoReducer.user);   
   //State to hold the comment text
   const[commentText, setCommentText] = useState(''); 
   //Get postId from URL parameters
   const post= useParams();
   //Extract postId from parameters
   const postId = post.id;

    //Base URL for server public folder
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

   //Function to handle form submission and create a new comment
   const handleSubmit = async(e)=>{
    e.preventDefault();

    //Prepare comment data to be dispatched to the server
    const commentData = {
        postId,
        authorId:user._id,
        text: commentText,
    }
    try{
         // Dispatch createComment action to add the new comment
        await dispatch(createComment(commentData));
         // Clear the comment input field after submission
        setCommentText('');

    }catch(error){
        console.log(error);
    }
   }

   

    return(
        <div className='CommentShare'>
            <div className='profilePostContainer'>
            {/* Display user's profile picture */}
            <img 
        src={
            user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
        />
             {/* Comment form */}
           <form onSubmit={handleSubmit}>
             {/* Input field for entering comment text */}
             <input className='commentInput' type="text" placeholder="Write a comment" maxlength="20" value={commentText} onChange={(e)=> setCommentText(e.target.value)} required/>
              {/* Button to submit the comment */}
            <button className='btn' type="submit">Comment</button>
           </form>
        </div>

        </div>
    )
}

export default CommentShare;