import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getSingleBoard, updateBoardInfo, deleteBoard, removePostFromBoard } from '../../../actions/BoardAction'; 
import { uploadImage } from '../../../actions/UploadAction';
import "./SingleBoard.css";


//SingleBoard component for displaying and managing a single board
const SingleBoard = () => {

    const navigate = useNavigate();
    const {boardId}  = useParams(); 
    const dispatch = useDispatch();
    //Base URL for server public folder
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //State and hooks for managing board data and editing state
    const [pictureBoard,setPictureBoard] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedBoard, setEditedBoard] = useState({
        name: '',
        picture: ''
    });

    //Accessing state managed by redux
    const { boardDetails, loading, error } = useSelector((state) => state.boardReducer);
    const user = useSelector((state) => state.authReducer.authData);

    //Fetch single board data when component mounts/boardId changes
    useEffect(() => {
        dispatch(getSingleBoard(boardId));
    }, [dispatch,boardId]);

    //Update editedBoard wen boardDetails is fetched or changed
    useEffect(() => {
        if (boardDetails) {
            setEditedBoard({
                name: boardDetails.name || '', // Ensure fallback to empty string if undefined
                picture: boardDetails.pictureBoard || '' // Ensure property exists and fallback
            });
        }
    }, [boardDetails]);

    
    const handleEditClick = () => {
        setIsEditing(true);
    };
    
    //Handling file input change
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPictureBoard(e.target.files[0]);
        }
    };
    
    //Handling input change for board name
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBoard(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
        
        //Handling board update submission
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            let updateData = { ...editedBoard };
            
            if (pictureBoard) {
                const data = new FormData();
                const fileName = Date.now() + pictureBoard.name;
                data.append("name", fileName);
                data.append("file", pictureBoard);
                
                try {
                    
                    await dispatch(uploadImage(data));
                    updateData.pictureBoard = fileName;
                } catch (err) {
                    console.log(err);
                }
            }
            
            dispatch(updateBoardInfo(boardId, user._id, updateData));
            setIsEditing(false);
        };
        
        //Handling board deletion
        const handleDelete = () => {
            if (window.confirm('Are you sure you want to delete this board?')) {
                dispatch(deleteBoard(boardId,user._id));
                navigate(`/profile/${user._id}`);
            }
        };
        
        //HHandling post removal from the board
        const handleRemovePost = (postId)=>{
            if(window.confirm('Are you sure  you want to remove POST?')){
                dispatch(removePostFromBoard(boardId, postId));
            }
        }
        

    return (
        <div className="SingleBoard ContentContainer">
         {/* Rendering the board details and edit form */}
            {isEditing ? (
                <form onSubmit={handleSubmit} className='SingleBoardForm DisplayFlexCenterColumn'>
                    <label htmlFor="boardName">Board Name:</label>
                    <input className='nameInput' type="text" id="boardName" name="name" value={editedBoard.name} onChange={handleChange} />
                    <label htmlFor="boardPicture">Board Picture:</label>
                    <input type="file" name="boardImage" onChange={handleImageChange} />
                    <button  className='btn' type="submit">Save</button>
                </form>
            ) : (
                <div className='DisplayFlexCenterColumn BoardCover'>
                    <h2 className='title'>{boardDetails?.name}</h2>
                    <img className="boardPicture"
        src={
            boardDetails?.pictureBoard
            ? serverPublic + boardDetails.pictureBoard
            : serverPublic + "defaultProfile.png"
        }
        alt="Board Cover"
      /> 
                    <button className='btn editbtn' onClick={handleEditClick}>Edit Board</button>
                    <button className='btn deleteButton' onClick={handleDelete}>Delete Board</button>
                    <div className='board'></div>
                </div>
            )}
             {/* Link to navigate back to the user's profile */}
             <Link to={`/profile/${user._id}`}>
                <button className='btn goBackBtn outlineBtn'>Go back to the boards</button>
            </Link>
              {/* Rendering the list of posts associated with the board */}
            {boardDetails ? (
                <div className='BoardDetails'>
                   
                    <ul className='postList PostsContainer'>
                        {boardDetails?.postInfo && boardDetails?.postInfo?.length > 0 ? (
                            boardDetails.postInfo.map((post) => (
                                
                                <li key={post._id} className='postFuncComponent singleBoardList'>
                                    <img className='postImage singleImage' src={post.image ? `${process.env.REACT_APP_PUBLIC_FOLDER}${post.image}` : ''} alt="Post" />

                                    <div className='detail DisplayFlexCenterColumn'>

                                    <Link to={`/posts/${post._id}`}>
                                        <button className='btn'>See Post</button>
                                    </Link>

                                    <button className='btn deleteButton' onClick={()=>handleRemovePost(post._id)}>REMOVE POST</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No posts found for this board.</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Board not found</p>
            )}
          
            
        </div>
    );
};

export default SingleBoard;
