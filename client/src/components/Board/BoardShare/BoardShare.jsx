import react, {useState,useRef} from 'react';
import "./BoardShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage,uploadBoard } from '../../../actions/UploadAction';
import { UilTimes } from "@iconscout/react-unicons";


//BoardShare component for creating [sharing] boards
const BoardShare = ()=>{

  //Redux hooks to dispatch actions and select data from the store
   const dispatch = useDispatch();

   const user = useSelector((state)=>state.authReducer.authData);

   const userDetails = useSelector((state)=>state.userInfoReducer.user);

   //State and refs for managing board data and file input
   const loading = useSelector((state) => state.boardReducer.uploading);
   const [pictureBoard, setPictureBoard] = useState(null);
   const name = useRef();
   const imageRef = useRef();
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


  //Function to handle file input change
   const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
        let img = e.target.files[0];
        setPictureBoard(img);
    }
   }
   

   //Function to handle board upload
   const handleUpload  = async(e)=>{
    e.preventDefault();

    const newBoard = {
        createdBy: user._id,
        name: name.current.value
    }

    if(pictureBoard){
    const data = new FormData();
    const fileName = Date.now() + pictureBoard.name;
    data.append("name", fileName);
    data.append("file", pictureBoard);
    newBoard.pictureBoard = fileName;
    console.log(newBoard);
    try{
        dispatch(uploadImage(data));
    }catch(err){
        console.log(err);
    }
}
    dispatch(uploadBoard(newBoard)); //Dispatch action to upload board data
    resetShare(); //Reset board sharing form
   }

   //Function to reset board sharing form
   const resetShare = ()=>{
    setPictureBoard(null);
    name.current.value="";
   }


    return(
        <div className='createBoard DisplayFlexCenterColumn'>
          {/* Form for creating and sharing boards */}
            <div className="BoardInputs profilePostContainer">
              {/* Display user's profile picture */}
            <img src={userDetails && userDetails.profilePicture ? serverPublic + userDetails.profilePicture : serverPublic + "defaultProfile.png"} alt="ProfilePicture"/>
            <div className='formContainer'>
              {/* Input field for board name */}
                <input type="text" placeholder="Create a board!" required ref={name}/>
              {/* Button to trigger file input */}
            <div className="pngUpload" onClick={()=>imageRef.current.click()} >
              <UilScenery />
            </div>
            {/* Button to upload board */}
            <button className="btn btnUpload" onClick={handleUpload} disabled={loading}>
                 {loading ? "uploading": "Share"}
            </button>
             {/* Hidden file input */}
            <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
                 </div>
               </div>
            </div>
             {/* Display preview of uploaded image */}
            {pictureBoard && (
          <div className='minuscul'>
            <div >
            <img src={URL.createObjectURL(pictureBoard)} alt="preview" />
            </div>
            {/* Button to remove uploaded image */}
            <UilTimes onClick={() => setPictureBoard(null)} />
          </div>
        )}
        </div>
    )
}

export default BoardShare;