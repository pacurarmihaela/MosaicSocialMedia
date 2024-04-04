import React from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UilUser,UilSearch,UilUsersAlt,UilMessage,UilSignOutAlt,UilRaindrops} from "@iconscout/react-unicons";
import "./NavBar.css";
import {logout} from "../../actions/AuthAction";

//Navbar component
const NavBar = ()=>{
   //Redux hooks
   const user = useSelector((state)=> state.authReducer.authData);
   const userInfo = useSelector((state)=> state.userInfoReducer.user);
   const dispatch = useDispatch();

    // Function to handle logout
   const handleLogout =  ()=>{
      dispatch(logout()); //dispatch logout action
   }


    return(
        <div className='Nav '>
           {/* Navigation links */}
         <ul>
            {/* Home link */}
          <Link to={'/home'} className='DisplayFlexCenterColumn'>
          <UilRaindrops     />
          <p>Mosaic</p>
          </Link>
           {/* Profile link */}
            <Link to={`/profile/${user._id}`}>
            <UilUser />
            </Link>
             {/* Explore link */}
            <Link to={'/home'}>
            <UilSearch/>
            </Link>
             {/* Explore Accounts link */}
            <Link to={`/exploreAccounts/${user._id}`}>
            <UilUsersAlt/>
            </Link>
             {/* Chat link */}
            <Link to="../chat">
            <UilMessage/>
            </Link>
         </ul>
           {/* Logout button */}
         <button className="btn logoutBtn" onClick={handleLogout}><UilSignOutAlt/></button>
        </div>
    )
}

export default NavBar;