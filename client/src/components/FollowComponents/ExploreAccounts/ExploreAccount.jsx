import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreAccounts,followUser,unfollowUser } from '../../../actions/UserInfoAction'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

//Explore Accounts component
const ExploreAccounts = () => {

  //Redux hooks
  const dispatch = useDispatch();
  const  user  = useSelector((state) => state.userInfoReducer.user);
  const { exploreAccounts, loading, error } = useSelector((state) => state.userInfoReducer);

   //Base URL for server public folder
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


// Fetch explore accounts when component mounts or user changes
  useEffect(() => {
    if (user && user._id) {
      dispatch(getExploreAccounts(user._id));
    }
  }, [dispatch, user]);

   
  // Function to handle follow/unfollow toggle
  const handleFollowToggle = (account) => {
    const isFollowing = user.followings?.includes(account._id);
    if (isFollowing) {
      dispatch(unfollowUser(user._id, account._id));
    } else {
      dispatch(followUser(user._id, account._id));
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='followCard'>
      <h2 className='title'>Explore Accounts</h2>
      <div className='DisplayFlexCenterColumn'>

      <ul className='DisplayFlexCenterColumn'>
        {exploreAccounts?.map((account) => (
          <li className='otherUsersProfile DisplayFlexCenterColumn' key={account._id}>
            <div className='ProfileContainer'>
              <img className="profilePicture"
          src={
            account.profilePicture
            ? serverPublic + account.profilePicture
            : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
          />
          </div>

          <div className='otherUserInfo DisplayFlexCenterColumn'>

          <p>  {account.firstname} | {account.username}</p> 
             <Link to={`/other/${account._id}`}>
              <button className="btn outlineBtn">See Profile</button>
             </Link>
        
              <button className='btn' onClick={() => handleFollowToggle(account)}>
                {user.followings?.includes(account._id) ? "Unfollow" : "Follow"}
              </button>
          </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ExploreAccounts;
