
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "../../actions/UploadAction";
import { deleteUser } from '../../actions/AuthAction';
import { updateUser } from '../../actions/UserInfoAction';
import './EditProfile.css';
import { Link } from 'react-router-dom';

//EditProfile component 
const EditProfile =()=>{

  //Redux hooks
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfoReducer.user);
   
  //State to manage form data and image uploads
   const [formData, setFormData] = useState(user);
   const [profileImage, setProfileImage] = useState(null);
   const [coverImage,setCoverImage] = useState(null);

   //Function to andle form input changes
   const handleChange =(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
   }

   //Function to handle image changes
   const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
        let img = e.target.files[0];
        e.target.name ==="profileImage"
        ? setProfileImage(img): setCoverImage(img);
    }
   };

   //HANDLE FORM submission
   const handleSubmit = (e)=>{
    e.preventDefault();
    let UserData = formData;
    //Upload image if selected
    if(profileImage){
        const data = new FormData();
        const fileName = Date.now() + profileImage.name;
        data.append("name", fileName);
        data.append("file", profileImage);
        UserData.profilePicture = fileName;
        try{
          dispatch(uploadImage(data));
        }catch(err){
            console.log(err);
        }
    }
    //upload cobver image if selected
    if (coverImage) {
        const data = new FormData();
        const fileName = Date.now() + coverImage.name;
        data.append("name", fileName);
        data.append("file", coverImage);
        UserData.coverPicture = fileName;
        try {
          dispatch(uploadImage(data));
        } catch (err) {
          console.log(err);
        }
      }
      //dispatch action to update user infomration
      dispatch(updateUser(user._id, UserData));
      //display success message
      alert("Profile updated successfully. Please log in again.");
   }

   //Function to handle user account deletion
   const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        dispatch(deleteUser(user._id)); 
    }
};


   return(
    <form className="infoForm DisplayFlexCenterColumn editForm" onSubmit={handleSubmit}>
    <h3>Your Info</h3>
   
    <div className='DisplayFlexCenterColumn'>
      <div>

      <label>First Name:</label>
      <input
        value={formData.firstname}
        onChange={handleChange}
        type="text"
        placeholder="First Name"
        name="firstname"
        className="infoInput"
        />
        </div>
        <div>

      <label>Last Name: </label>
      <input
        value={formData.lastname}
        onChange={handleChange}
        type="text"
        placeholder="Last Name"
        name="lastname"
        className="infoInput"
        />
      </div>
    </div>
    
    
      <div>
      <label>Profile image: </label>
      <input type="file" name="profileImage" onChange={onImageChange} />
      </div>

    <button className="button infoButton" type="submit">
      Update
    </button>

    <button className="button infoButton deleteButton" type="button" onClick={handleDeleteUser} >
                Delete Account
    </button>

      <Link to ={`/profile/${user._id}`}>
       <button className='btn infoButton'>Go back to Profile</button>
     </Link>
  </form>

   )


}

export default EditProfile;