import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersPosts } from "../../../actions/PostAction";
import Post from "../../Post/Post";
import { useParams } from "react-router-dom";
import { getUser } from "../../../actions/UserInfoAction";
import "./ProfilePage.css"

// Other user view ProfilePage component
const ProfilePage = () => {
  //Redux hooks
   const dispatch = useDispatch();
   const params = useParams();
   const {posts,loading,error} = useSelector((state)=> state.postReducer);
   const user = useSelector((state)=> state.userInfoReducer.user);
  
   //Extract profile Id from URL parameters
   const profileId = params.id;

    //Base URL for server public folder
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    // Fetch user information and posts when component mounts or profile ID changes
   useEffect(()=>{
       dispatch(getUser(profileId)); // Fetch user information
    },[dispatch, profileId])
    
    useEffect(()=>{
        dispatch(getAllUsersPosts(profileId)); // Fetch posts by user
    }, [dispatch,profileId]);
    
    return(
        <div className="ProfileCard DisplayFlexCenterColumn ">
             {/* Profile information */}
             <div className="ProfileContainer otherProfileContainer">
                <img className="profilePicture otherProfilePicture"
          src={
            user?.profilePicture
              ? serverPublic + user?.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
        </div>

                <div className="ProfileInfo followProfile">

                  <div className="ProfileName DisplayFlexCenterColumn">
                    <span>{user?.firstname} {user?.lastname}</span>
                    <span className="username">{user?.username}</span>
                  </div>

                  <div className="StatusContainer">
                    <div className="followStatus">

                      <div className="spanCount">

                       <span className="numberFollow">{user?.followers?.length ?? 0}</span>
                       <span>Followers</span>

                      </div>
                      <div className="spanCount">
                       <span className="numberFollow">{user?.followings?.length ?? 0}</span>
                       <span>Following</span>
                      </div>
                    </div>

                      <div className="posts">
                        <span className="numberFollow">{posts.length}</span>
                      <p>
                        Posts
                        </p> 
                        </div>
                  </div>
                </div>
                 {/* Display user's posts */}
                <div className="FollowPage">
                  <div className="PostsContainer">                   {loading?(
                    <p>Loading posts...</p>
                   ): posts.length >0 ?(
                     posts.map(
                        (post)=>
                        ( 
                        <Post key={post._id}data={post}/>
                        )
                        
                     )
                   ):(
                    <p>No posts found.</p>
                   )}
                </div>
                </div>

        </div>
    )
}

export default ProfilePage;