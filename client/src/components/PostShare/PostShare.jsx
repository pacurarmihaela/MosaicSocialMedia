import React, { useState, useRef } from "react";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes  } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

//Define PostShare component
const PostShare = () => {
  const dispatch = useDispatch();
   // Fetching user data from Redux store
  const  user  = useSelector((state) => state.authReducer.authData);
  const user2 = useSelector((state) => state.userInfoReducer.user);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const imageRef = useRef();
   //Base URL for server public folder
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


   // Function to handle image change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };


  // Function to handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

   // Post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // If there is an image with the post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

 // Function to reset post share form
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
      <div className="createBoard DisplayFlexCenterColumn">
    <div className="BoardInputs profilePostContainer">
      <img 
        src={ user2 &&
          user2.profilePicture
          ? serverPublic + user2.profilePicture
          : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />

      <div className="formContainer">
        <input className="text"
          type="text"
          placeholder="Let's post something!"
          required
          ref={desc}
          />
        
          <div
            className="pngUpload" 
            
            onClick={() => imageRef.current.click()}
            >
            <UilScenery />
            
          </div>
          <button
            className="btn"
            onClick={handleUpload}
            disabled={loading}
            >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
      </div>
       {/* Display image preview and remove button */}
        {image && (
          <div className="minuscul">
            <div>
            <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
            <UilTimes onClick={() => setImage(null)} />
          </div>
        )}
        </div>
    
  );
};

export default PostShare;