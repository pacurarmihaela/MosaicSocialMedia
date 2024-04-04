import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllBoards} from "../../../actions/BoardAction";
import { Link } from 'react-router-dom';
import "./BoardList.css";
import BoardShare from "../BoardShare/BoardShare";


const BoardList = ()=>{

  //hooks - to dispatch actions and select data from the store
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.authReducer.authData);

    const boards = useSelector((state)=> state.boardReducer.boards);
    const loading = useSelector((state)=> state.boardReducer.loading);
    const  error = useSelector((state)=> state.boardReducer.error);

    //Base URL for server public folder
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //Effect hook to fetch all boards when the component mounts/ user changes
   useEffect(()=>{
    if(user){
        dispatch(getAllBoards(user._id));
    }
   },[dispatch, user._id ]);

   console.log(boards); //Debugging purpose


    return(
        <div className='BoardList'>
            {/* Display loading message if data is loading */}
            {loading && <p>Loading...</p>}

            {/* Display error message if there's an error */}            
            {error && <p>Error: {error}</p>}

          {/* --- BoardShare component for sharing boards */}
          <div className='BoardShareList'>
          <BoardShare/>
        </div>

       {/* Display the list of boards */}
      {boards && boards.length > 0 ? (
        <ul className='boardUl'>
          {boards?.map((board) => (
            <Link to={`/board/${board._id}`}>
                {/* Display individual board details */}
            <div className='boardContainer'>

            <div className='boardCover'>
               {/* Display board cover image */}
            <img className='boardImg'
        src={
          board.pictureBoard
          ? serverPublic + board.pictureBoard
          : serverPublic + "defaultProfile.png"
        }
        alt="Board Cover"
        />
      </div>

            <div className='boardInfo DisplayFlexCenterColumn'>
              {/* Display board owner's info */}
             <li key={board._id}>{user.firstname}</li>
             <li key={board._id}>{board.name}</li>
             <li key={board._id}>{board.createdAt}</li>
            </div>
          </div>
            </Link>
          ))}
        </ul>
      ) : (
        // Display message if no boards are found
        <p>No boards found</p>
        )}
        

</div>
    )
}

export default BoardList;