import * as PostsApi from "../api/PostRequest";


export const getTimelinePosts = (id) => async (dispatch) => {
   dispatch({ type: "RETRIEVING_START"});
   try{
    const {data} = await PostsApi.getTimelinePosts(id);
    dispatch({type: "RETRIEVING_SUCCESS", data:data});
   }catch(err){
    console.log(err);
    dispatch({type:"RETRIEVING_FAIL"});
   }
}

export const getPostById=(id)=> async (dispatch) => {
   dispatch({type: "RETRIEVING_START"});
   try{
      const {data} = await PostsApi.getPostById(id);
      dispatch({type:"RETRIEVING_SUCCESS", data:data});
   }catch(err){
      console.log(err);
      dispatch({type:"RETRIEVING_FAIL"});
   }
}

export const getAllUsersPosts =(id)=> async(dispatch)=>{
   dispatch({type: "RETRIEVING_START"});
   try{
     const {data} = await PostsApi.getAllUsersPosts(id);
     dispatch({type:"RETRIEVING_SUCCESS", data:data})
   }catch(err){
      console.log(err);
      dispatch({type: "RETRIEVING_FAIL"});
   }
}


export const editPost = (id, userId, newDesc) => async (dispatch) => {
   dispatch({ type: "EDIT_DESC_START" });
   try {
       // Assuming the API expects an object with userId and newDesc
       const { data } = await PostsApi.editPost(id, { userId, newDesc });
       dispatch({ type: "EDIT_DESC_SUCCESS", payload: data });
   } catch (err) {
       console.log(err);
       dispatch({ type: "EDIT_DESC_FAIL" });
   }
};

export const deletePost =(id, userId)=>async (dispatch)=>{
   dispatch({type: "DELETE_POST_START"});
   try{
      await PostsApi.deletePost(id,userId);
      dispatch({type: "DELETE_POST_SUCCESS", payload:id})

   }catch(error){
      console.log(error);
      dispatch({type: "DELETE_POST_FAIL", payload:error})
   }
}