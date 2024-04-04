import React from "react";
import "./PostSide.css"
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";

//Define the PostSide component
const PostSide = () => {
    return(
        <div className="PostSide DisplayFlexCenterColumn">
             {/* Container for posting share */}
            <div className="PostShareContainer">
             {/* Render the PostShare component */}
            <PostShare/>
            </div>
             {/* Container for displaying posts */}
            <div className="PostContainer">
            {/* Render the Posts component */}
            <Posts/>
            </div>
        </div>
    )
}

export default PostSide;