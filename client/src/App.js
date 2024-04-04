import {useSelector } from 'react-redux';
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NavBar from './components/NavBar/NavBar';
import {Routes, Route, Navigate} from "react-router-dom";
import SingleDisplayPost from './components/SingleDisplayPost/SingleDisplayPost';
import SingleBoard from './components/Board/SingleBoard/SingleBoard';
import EditProfile from './components/Edit/EditProfile';
import Followers from './components/FollowComponents/Followers/Followers';
import Followings from './components/FollowComponents/Followings/Followings';
import ExploreAccounts from "./components/FollowComponents/ExploreAccounts/ExploreAccount";
import ProfilePage from "./components/OtherUserProfile/ProfilePage/ProfilePage";
import Chat from "./pages/Chat/Chat";


function App() {
  const user = useSelector((state) =>  state.authReducer.authData);

  return (
    <div className="App">
{user && <NavBar/>}

     <Routes>
        <Route path="/" element={user ? <Navigate to="home"/> : <Navigate to="auth"/>} />

        <Route path="/home" element={user? <Home/> : <Navigate to="../auth" /> }/>


        <Route path= "/auth" element={user ? <Navigate to ="../home"/> : <Auth/>} />

       

        <Route path="/profile/:id" element={user ? <Profile/> : <Navigate to="../auth"/>} />

        <Route path="/other/:id" element={user ? <ProfilePage/> : <Navigate to="../auth"/>} />
        
        <Route path="/posts/:id" element={<SingleDisplayPost/>}/>

        <Route path="/board/:boardId" element={<SingleBoard/>}/>

        <Route path="/profile/:id/edit" element={user ? <EditProfile/>: <Navigate to="../auth"/>} />

        <Route path="/profile/:id/followers" element={user ? <Followers/>: <Navigate to="../auth"/>} />

        <Route path="/profile/:id/followings" element={user ? <Followings/>: <Navigate to="../auth"/>} />

        <Route path="/exploreAccounts/:id" element={user ? <ExploreAccounts/>: <Navigate to="../auth"/>} />

        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />

     </Routes>
    </div>
  );
}

export default App;
