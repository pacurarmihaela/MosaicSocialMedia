import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8144"});

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const getPostById=(id)=> API.get(`/post/${id}`);

export const editPost = (id,postData)=> API.put(`/post/${id}/desc`, postData)

export const getAllUsersPosts=(id)=> API.get(`/post/${id}/all`);

export const likePost=(id, userId) => API.put(`post/${id}/like`, {userId: userId});

export const deletePost = (id, userId) => API.delete(`post/${id}`, {data:{userId}})