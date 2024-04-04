
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { unfollowUser,followUser } from "../../../actions/UserInfoAction"; // Adjust the path as needed
import "./Followers.css";
import { Link } from "react-router-dom";

//Followes component
const Followers = () => {
  
  //Redux hooks
  const { userId } = useParams(); 
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoReducer.user);
  const followers = userInfo.followersDetails || []; 

 //Base URL for server public folder
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Function to handle follow/unfollow toggle
  const handleFollowToggle = (followId) => {
    console.log(followId + " is the target user ID");
  
    // Check if the current user is already following the target user
    const isFollowing = userInfo.followings.includes(followId);
  
    if (isFollowing) {
      console.log("Attempting to unfollow user with ID:", followId);
      dispatch(unfollowUser(userInfo._id, followId));
    } else {
      console.log("Attempting to follow user with ID:", followId);
      dispatch(followUser(userInfo._id, followId));
    }
  };
  return (
    <div className="followCard">
      <h2 className="title">Followers</h2>
      <div className="DisplayFlexCenterColumn">
         {/* Link to go back to profile page */}
      <Link to ={`/profile/${userId}`}>
       <button className='btn'>Go back to Profile</button>
     </Link>

      <ul className="DisplayFlexCenterColumn">
        {followers.map((follower) => (
          <li className="otherUsersProfile " key={follower._id}>
            <div className="ProfileContainer">
               {/* Profile picture */}
            <img className="profilePicture"
              src={
                follower.profilePicture
                ? `${serverPublic}${follower.profilePicture}`
                : `${serverPublic}defaultProfile.png`
              }
              alt="Profile"
              />
              </div>

              <div className="otherUserInfo DisplayFlexCenterColumn">
                {/* User information */}
            <p>  {follower.firstname} | {follower.username}</p> 
            {/* Link to see profile */}
             <Link to={`/other/${follower._id}`}>
              <button className="btn outlineBtn">See Profile</button>
             </Link>
              {/* Follow/unfollow button */}
            <button className="btn"
              onClick={() => handleFollowToggle(follower._id)}
              >
                {userInfo.followings.includes(follower._id) ? "Unfollow" : "Follow"}
            </button>
                </div>
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
};

export default Followers;
