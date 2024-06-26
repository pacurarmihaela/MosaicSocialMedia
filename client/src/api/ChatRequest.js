import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8144' });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const getUsersNotInChat = (userId) => API.get(`/chat/notInChat/${userId}`);


export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

