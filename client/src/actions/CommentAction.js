import * as CommentsApi from "../api/CommentRequest";

export const createComment = (commentData)=> async(dispatch)=>{
    dispatch({type: "CREATE_COMMENT_START"});

    try{
        const {data} = await CommentsApi.createCommentRequest(commentData);
        dispatch({type: "CREATE_COMMENT_SUCCESS", payload:data})

    }catch(error){
        dispatch({type: "CREATE_COMMENT_FAIL", payload:error});
    }
};


export const deleteComment = (commentId,userId,postId) => async (dispatch) => {
    dispatch({ type: "DELETE_COMMENT_START" });

    try {
       
        await CommentsApi.deleteCommentRequest(commentId,userId,postId);
        dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: commentId });
    } catch (error) {
        dispatch({ type: "DELETE_COMMENT_FAIL", payload: error });
    }
};


export const getAllComments = (postId) => async (dispatch) => {
    dispatch({ type: "FETCH_COMMENTS_START" });

    try {
        const data = await CommentsApi.getAllCommentsRequest(postId); 

        console.log("Comments data from API:", data); 

        dispatch({ type: "FETCH_COMMENTS_SUCCESS", payload: data }); 
    } catch (error) {
        dispatch({ type: "FETCH_COMMENTS_FAIL", payload: error });
    }
};
