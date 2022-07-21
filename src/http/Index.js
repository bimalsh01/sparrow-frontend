import axios from 'axios';

const token = localStorage.getItem('accessToken');

console.log(localStorage.getItem('token'));
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers:{
        
        'Content-Type': 'application/json',
        Accept: 'application/json',
        
    }
});


// LIst of endpoint
export const sendOtp = (data) => api.post('/api/send-otp',data, );
export const verifyOtp = (data) => api.post('/api/verify-otp',data);
export const activate = (data) => api.post('/api/activate', data, {headers:{'Authorization': `Bearer ${token}`}});
export const login = (data) => api.post('/api/login', data);
export const logout = () => api.post('/api/logout');
export const updateProfile = (data) => api.post('/api/update-profile', data);
export const updatePassword = (data) => api.post('/api/update-password', data);
export const questions = (data) => api.post('/api/questions', data, {headers:{'Authorization': `Bearer ${token}`}});
export const NavSearch = (data) => api.post('/api/search', data);
export const QsnSearch = (data) => api.post('/api/search-qsn', data);
export const getQuestions = () => api.get('/api/allpost');
export const getOneQuestion = (questionId) => api.get(`/api/qnapage/${questionId}`);
export const postAnswer = (data) => api.post('/api/answer', data, {headers:{'Authorization': `Bearer ${token}`}});
export const getAnswers = (questionId) => api.get(`/api/get-answers/${questionId}`);
export const like = (data) => api.put('/api/like', data, {headers:{'Authorization': `Bearer ${token}`}});
export const unlike = (data) => api.put('/api/unlike', data,  {headers:{'Authorization': `Bearer ${token}`}});
export const getAllQuestionsByUser = (userId) => api.get(`/api/get-questions/${userId}`);

// edit question
export const editQuestion = (data) => api.post('/api/editquestion', data, {headers:{'Authorization': `Bearer ${token}`}});

// delete question
export const deleteQuestion = (questionId) => api.delete(`/api/delete-question/${questionId}`, {headers:{'Authorization': `Bearer ${token}`}});

export const getUser = (userId) => api.get(`/api/user/${userId}`);
export const follow = (data) => api.put('/api/follow', data, {headers:{'Authorization': `Bearer ${token}`}});
export const unfollow = (data) => api.put('/api/unfollow', data, {headers:{'Authorization': `Bearer ${token}`}});
// get all followers
export const getAllFollow = (userId) => api.get(`/api/allfollow/${userId}`);
export const getConversations = (userId) => api.get(`/api/chat/conversation/${userId}`);
export const getMessages = (conversationId) => api.get(`/api/chat/messages/${conversationId}`);
export const sendMessage = (data) => api.post('/api/chat/send-message', data);
export const getAllUsers = () => api.get('/api/users');

// create conversation
export const createConversation = (data) => api.post('/api/chat/conversation', data);

// Favorite
export const addFavourite = (data) => api.post('/api/addfav', data, {headers:{'Authorization': `Bearer ${token}`}});
// get all favourite
export const getAllFavourite = (userId) => api.get(`/api/getfav/${userId}`);

// rooms
export const createRoom = (data) => api.post('/api/rooms',data);
export const getAllRooms = () => api.get('/api/rooms');
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);


// Interceptors backend and frontend checking
api.interceptors.response.use((config)=>{
    return config;

}, async (error)=>{
    const originalRequest = error.config;
    if (error.response.status === 400 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{
                withCredentials: true,
            });
            
            return api.request(originalRequest);

        } catch (error) {
            console.log(error.mssage)
        }
    }
    throw error;
});


export default api;