import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8144" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getAllUser = ()=> API.get('/user')
export const getUser = (id) => API.get(`/user/${id}`);
export const getExploreAccounts = (userId) =>API.get(`/user/exploreAccounts/${userId}`);

export const updateUser = (id, formData) =>  API.put(`/user/${id}/edit`, formData);

export const followUser = (userId,followId)=> API.put(`/user/${followId}/follow`,  {_id: userId})
export const unfollowUser = (userId, unfollowId)=> API.put(`/user/${unfollowId}/unfollow`, {_id: userId})