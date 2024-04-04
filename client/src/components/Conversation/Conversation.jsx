import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequest";

//Conversation component to display user information in a conversation
const Conversation = ({ data, currentUser, online }) => {

  //Debugging reason
  console.log(currentUser + " currentUser");
  console.log(data);

  //State to hold user data
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  
  useEffect(()=> {
      //Find the user Id of te conversation participant
      const userId = data.members.find((id)=>id!==currentUser)
      
      //Fetch user data
      const getUserData = async ()=> {
          try
          {
              const {data} =await getUser(userId)
              //Update user data state
              setUserData(data)
              //Dispatch action to save user data to Redux store
              dispatch({type:"SAVE_USER", data:data})
            }
            catch(error)
            {
                console.log(error)
            }
        }
        
        //Debugging reason
        console.log(userId + " PRO");

        //Fetch user data when component mounts
        getUserData();
    }, [])
    return (
    <>
      <div className="follower conversation">
        <div>
           {/* Display online dot if user is online */}
          {online && <div className="online-dot"></div>}
           {/* Display user's profile picture */}
          <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
           {/* Display user's name and online status */}
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":"gray"}}>{online? " Online" : " (Offline)"}</span>
          </div>
        </div>
      </div>
        {/* Horizontal line separator */}
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;