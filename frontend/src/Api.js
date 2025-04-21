import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/'
 }
  
);

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
//userauth
export const loginUser = (userData) => API.post('/auth/login', userData);

export const updateUserProfile = (userData) =>
  API.put('/auth/profile', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const getUserProfile = () => API.get('/auth/getdata');
export const registerUser = (userData) => API.post('/auth/signup', userData);

//links
export const addLink = (linkData) => API.post('/links/add', linkData);
export const getLinks = () => API.get('/links');
export const updateLink = (id, updatedData) => API.put(`/links/update/${id}`, updatedData);
export const deleteLink = (id) => API.delete(`/links/delete/${id}`);
export const reorderLinks = (reorderedData) => API.put('/links/reorder', reorderedData);

//bio
export const addbio = (biodata) => API.post('/bio/add', biodata);
export const getbio = () => API.get('/bio/getbio');