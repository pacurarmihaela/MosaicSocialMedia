import React, { useEffect,useState } from "react";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/UserInfoAction";

//Define ProfileCard component
const ProfileCard = ({location}) => {
  const dispatch = useDispatch();
  //Fetching user data from Redux store
  const user  = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts);
  const userDetails = useSelector((state)=> state.userInfoReducer.user);
   //Base URL for server public folder
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  

  useEffect(() => {
    // Ensure user._id is available before dispatching
    if (user && user._id) {
      dispatch(getUser(user._id));
    }
  }, [dispatch, user]);

// Filter posts by user ID and get the count
const filteredPosts = Array.isArray(posts) ? posts.filter((post) => post.userId === user._id).length : 0;

 // If user details are not available yet, display loading
if (!userDetails) {
  return <div className="LoadingComponent">Loading...</div>; // Or any other placeholder content
}

  return (
    <div className="ProfileCard DisplayFlexCenterColumn">
      <div className="ProfileContainer">
        {/* Display user profile picture */}
        <img className="profilePicture"
          src={
            userDetails?.profilePicture
              ? serverPublic + userDetails?.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
       
      </div>
      <div className="ProfileInfo">

      <div className="ProfileName DisplayFlexCenterColumn">
        {/* Display user's full name and username */}
        <span>{user.firstname} {user.lastname}</span>
        <span className="username">{user.username}</span>
        
      </div>

      <div className="StatusContainer">
        <div className="followStatus">
{/* Display follower count with link to followers page */}
         <div className="spanCount">
         <Link to={`/profile/${user._id}/followers`}>
  <span className="numberFollow">{userDetails?.followers?.length ?? 0}</span>
  <span>Followers</span>
         </Link>
         </div>
          {/* Display following count with link to following page */}
        <div className="spanCount">
            <Link to={`/profile/${user._id}/followings`}>
  <span className="numberFollow">{userDetails?.followings?.length ?? 0}</span>
  <span>Following</span>
           </Link>
           </div>
        </div>
         {/* Display post count if location is "profilePage" */}
          <div>
          {location === "profilePage" && (
            <>
              <div className="posts">
              <span className="numberFollow">{Array.isArray(posts) ? posts.filter((post) => post.userId === user._id).length : 0}</span>
              <span >Posts</span>
              </div>{" "}
            </>
          )}
        </div>
      </div>

    </div>      
      </div>
  );
};

export default ProfileCard;