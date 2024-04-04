import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { unfollowUser,followUser } from "../../../actions/UserInfoAction";
import "../Followers/Followers.css";
import { Link } from "react-router-dom";

//Followings component
const Followings = () => {
  //Redux hooks
  const { userId } = useParams(); 
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer.user);
  const followings = userInfo.followingsDetails || []; 

  //Base URL for server public folder
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Function to handle follow/unfollow toggle
  const handleFollowToggle = ( unfollowId) => {
    // Check if the current user is already following the target user
    const isFollowing = userInfo.followings.includes(unfollowId);
     // Dispatch follow/unfollow action based on the current state
    if (isFollowing) {
      dispatch(unfollowUser(userInfo._id, unfollowId));
    } else {
      dispatch(followUser(userInfo._id, unfollowId));
    }
   
};
  return (
    <div className="followCard">
      <h2 className="title">Followings</h2>
      <div className="DisplayFlexCenterColumn">
         {/* Link to go back to profile page */}
      <Link to ={`/profile/${userId}`}>
       <button className='btn'>Go back to Profile</button>
     </Link>

      <ul className="DisplayFlexCenterColumn">
        {followings.map((following) => (
          <li className="otherUsersProfile " key={following._id} onClick={() => console.log( " Proba: " + following._id)}>
            <div className="ProfileContainer">
              {/* Profile picture */}
            <img className="profilePicture"
              src={
                following.profilePicture
                ? `${serverPublic}${following.profilePicture}`
                : `${serverPublic}defaultProfile.png`
              }
              alt="Profile"
              />
            </div>   

           <div className="otherUserInfo DisplayFlexCenterColumn">
            {/* User information */}
           <p>  {following.firstname} | {following.username}</p> 
            {/* Link to see profile */}
             <Link to={`/other/${following._id}`}>
              <button className="btn outlineBtn">See Profile</button>
             </Link>
              {/* Follow/unfollow button */}
            <button className="btn"
              onClick={() => handleFollowToggle(following._id)}>
                {userInfo.followings.includes(following._id) ? "Unfollow" : "Follow"}
            </button>
                </div>
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
};

export default Followings;
