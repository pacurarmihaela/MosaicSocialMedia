import React, { useEffect, useState } from "react";
import {Link} from'react-router-dom';
import "./Post.css";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import { getAllBoards,addPostToBoard } from "../../actions/BoardAction";

//Define Post component
const Post = ({data})=>{
     const dispatch = useDispatch();
     const [selectedBoard,setSelectedBoard] = useState('');

     //Fetching user data from Redux store
    const user = useSelector((state)=> state. authReducer.authData);
    //Checking if the post is initially liked by the user
    const initialLikedState = data.likes ? data.likes.includes(user._id) : false;
    const [liked, setLiked] = useState(initialLikedState) 
    const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);
    const [userPosts, setUserPosts] = useState({});
    //Fetching boards from Redux store
    const boards = useSelector((state)=> state.boardReducer.boards);

    //Fetching boards from Redux store
    useEffect(()=>{
        dispatch(getAllBoards(user._id));
    },[dispatch]);

    //Function to handle board selection change
    const handleBoardChange = (e)=>{
        setSelectedBoard(e.target.value);
    }

    //Function to save post to the selected board
    const handleSave=()=>{
        if(selectedBoard){
            dispatch(addPostToBoard(selectedBoard, data._id));
        }
        alert(`Post Saved to the board`);
    }

    //Function to handle like/unlike action
    const handleLike = () => {
        setLiked((prev)=> !prev)
        likePost(data._id, user._id)
        liked? setLikes((prev)=> prev-1) : setLikes((prev)=> prev+1)
    }

    return(
        <div className="PostContainer">
         <div className="postFuncComponent post">
             {/* Display post image */}
         <img className="postImage" src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER +data.image : '' } alt=""/>
             {/* Display like/unlike button */}
           <div className="postInfo post">
            <div className="detail">
                 {/* Display like/unlike button */}
            <div className="actionbuttons DisplayFlexCenterColumn">
            <div className="postReact">
            <img className="icon" src={liked?Heart: NotLike} alt="" onClick={handleLike}/>
         </div> 
             {/* Link to view the full post */}
            <Link to={`/posts/${data._id}`}>
                <button className="btn">See Post</button>
            </Link>
             {/* Dropdown to select board and save post */}
            <select className="selectBoard" value={selectedBoard} onChange={handleBoardChange}>
            <option value="">Select a Board</option>
                {boards.map(board => (
                    <option key={board._id} value={board._id}>{board.name}</option>
                    ))}  
            </select>
            <button className="btn" onClick={handleSave}>Save post</button>
            </div>
            </div>
           </div>
           </div>
        </div>
    )
}
export default Post;