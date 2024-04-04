import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async(dispatch)=>{
    try{
     await UploadApi.uploadImage(data);
    }catch(error){
        console.log(error);
    }
}

export const uploadPost = (data) => async(dispatch)=>{
    dispatch({type: "UPLOAD_START"})
    try{
      const newPost = await UploadApi.uploadPost(data)
      dispatch({type: "UPLOAD_SUCCESS", data: newPost})
    }catch(error){
        console.log(error);
        dispatch({type: "UPLOAD_FAIL"})
    }
}

export const uploadBoard = (payload) => async(dispatch)=>{
    dispatch({type: "BOARD_UPLOAD_START"});
    try{
        const newBoard = await UploadApi.uploadBoard(payload);
        dispatch({type:"BOARD_UPLOAD_SUCCESS", payload:newBoard})

    }catch(error){
        console.log(error);
        dispatch({type: "BOARD_UPLOAD_FAIL"});
    }
}