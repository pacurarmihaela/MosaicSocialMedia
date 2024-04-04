import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8144"});

export const createCommentRequest = (commentData)=>  API.post(`/comment/`, commentData);

export const deleteCommentRequest = (commentId, userId, postId)=>  API.delete(`/comment/${commentId}`, { data: { userId, postId } });


// Function to fetch all comments for a specific postId
export const getAllCommentsRequest = async (postId) => {
    const response = await API.get(`/comment/${postId}`); // Pass postId as part of the URL
    return response.data; // Return the data from the response
};
