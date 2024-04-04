import * as BoardApi from "../api/BoardRequest";

export const createBoard = (boardData) => async (dispatch) => {
    dispatch({ type: "BOARD_UPLOAD_START" });
    try {
        const { data } = await BoardApi.createBoard(boardData);
        dispatch({ type: "BOARD_UPLOAD_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "BOARD_UPLOAD_FAIL", payload: error.message });
    }
};

export const getAllBoards = (userId) => async (dispatch) => {
    dispatch({ type: "BOARD_RETRIEVING_START" });
    try {
        const { data } = await BoardApi.getAllBoards(userId);
        dispatch({ type: "BOARD_RETRIEVING_SUCCESS", payload: data });
        console.log(data);
    } catch (error) {
        dispatch({ type: "BOARD_RETRIEVING_FAIL", payload: error.message });
    }
};

export const getSingleBoard = (boardId) => async(dispatch)=>{
    dispatch({type: "SINGLE_BOARD_RETRIEVING_START"});
    try{
        const {data} = await BoardApi.getSingleBoard(boardId);
        dispatch({type:"SINGLE_BOARD_RETRIEVING_SUCCESS", payload:data});
    }catch(error){
        dispatch({type: "SINGLE_BOARD_RETRIEVING_FAIL", payload: error.message});
    }
}

export const updateBoardInfo = (boardId, userId, boardData) => async (dispatch) => {
    dispatch({type: "UPDATE_BOARD_START"});
    try {
        // Make sure to include userId in the request body
        const { data } = await BoardApi.updateBoardInfo(boardId, { ...boardData, userId });
        dispatch({type: "UPDATE_BOARD_SUCCESS", payload: data});
    } catch (error) {
        dispatch({type: "UPDATE_BOARD_FAIL", payload: error.message});
    }
};


export const deleteBoard = (boardId, userId) => async (dispatch) => {
    dispatch({ type: "BOARD_DELETE_START" });
    try {
        await BoardApi.deleteBoard(boardId, userId); 
        dispatch({ type: "BOARD_DELETE_SUCCESS", payload: boardId });
    } catch (error) {
        dispatch({ type: "BOARD_DELETE_FAIL", payload: error.message });
    }
};

export const addPostToBoard = (boardId, postId) => async (dispatch) => {
    dispatch({ type: "ADD_POST_TO_BOARD_REQUEST" });
    try {
        await BoardApi.addPostToBoard(boardId, postId);
        dispatch({ type: "ADD_POST_TO_BOARD_SUCCESS", payload: { boardId, postId } });
    } catch (error) {
        dispatch({ type: "ADD_POST_TO_BOARD_FAILURE", payload: error.message });
    }
};

export const removePostFromBoard = (boardId, postId) => async (dispatch) => {
    dispatch({ type: "REMOVE_POST_FROM_BOARD_REQUEST" });
    try {
        await BoardApi.removePostFromBoard(boardId, postId);
        dispatch({ type: "REMOVE_POST_FROM_BOARD_SUCCESS", payload: { boardId, postId } });
    } catch (error) {
        dispatch({ type: "REMOVE_POST_FROM_BOARD_FAILURE", payload: error.message });
    }
};
