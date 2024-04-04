import React, { useEffect,useState } from "react";
import "./Profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersPosts } from "../../actions/PostAction";
import Post from "../../components/Post/Post";
import BoardList from "../../components/Board/BoardList/BoardList";
import { Link } from "react-router-dom";

//Define the Profile component
const Profile = () => {
     // Get profile ID from URL parameters
   const {id: profileId} = useParams();
   const dispatch = useDispatch();
    // Fetching posts and loading state from Redux store
   const {posts, loading} = useSelector(state => state.postReducer);

    // State to manage active container (posts or boards)
   const [activeContainer, setActiveContainer] = useState('posts');

// Fetch user's posts when component mounts or profile ID changes
   useEffect(()=>{
    dispatch(getAllUsersPosts(profileId));
   }, [dispatch,profileId]);



    return(
        <div className="Profile">
            <div className="ProfileCenter DisplayFlexCenterColumn">
                 {/* Render profile card with profilePage prop */}
                <ProfileCard location="profilePage" />
                 {/* Link to edit profile */}
                <Link to={`/profile/${profileId}/edit`}>
                <button className="btn editbtn Profilebtn">Edit profile!</button>
                </Link>
                 {/* Button containers to switch between posts and boards */}
                <div className="btnContainers ">
                    <button className="btn" onClick={() => setActiveContainer('ManagePosts')}>See Posts</button>
                    <button className="btn" onClick={() => setActiveContainer('ManageBoards')}>See Boards</button>
               </div>
            </div>

            <div className="ContentContainer profileContentContainer ">
                <div className="profileAdjust">
                {/* Container for user's posts */}
                <div className={`PostsContainer manageProfileContainer ${activeContainer === 'ManagePosts' ? 'active' : ''}`}>
                   {loading?(
                       <p>Loading posts...</p>
                   ): posts.length >0 ?(
                       posts.map((post)=> <Post key={post._id}data={post}/>)
                       ):(
                           <p>No posts found.</p>
                           )}
                </div>
                {/* Container for user's boards */}
                <div className={`BoardsContainer manageBoardsContainer ${activeContainer === 'ManageBoards' ? 'active' : ''}`}>
                    <BoardList/>
                </div>

            </div>
              

            </div>
        </div>
    )
}

export default Profile;