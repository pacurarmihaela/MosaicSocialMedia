import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8144",withCredentials: true });


// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
//   });


export const logIn = (formData) => API.post('/auth/login', formData);

export const signUp = (formData) => API.post('/auth/register', formData);

export const logout = () => API.post('/auth/logout', {}, { withCredentials: true });

export const deleteUser = (userId) => API.delete(`/user/${userId}`);

