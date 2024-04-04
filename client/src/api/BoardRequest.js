import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8144",withCredentials: true });


export const createBoard = (boardData)=> API.post(`/board`, boardData);

export const getAllBoards = (userId)=> API.get(`/board/${userId}/all`,userId);

export const getSingleBoard = (boardId)=>API.get(`/board/${boardId}`);

export const updateBoardInfo = (boardId,boardData) => API.put(`/board/${boardId}`, boardData);

export const deleteBoard = (boardId, userId)=> API.delete(`/board/${boardId}`, {data: {userId}})

export const addPostToBoard = (boardId, postId)=> API.put(`/board/${boardId}/addPost`,{ postId});

export const removePostFromBoard = (boardId,postId)=>API.put(`/board/${boardId}/removePost`, {postId});