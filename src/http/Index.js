import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});


// LIst of endpoint
export const sendOtp = (data) => api.post('/api/send-otp',data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);
export const login = (data) => api.post('/api/login', data);
export const logout = () => api.post('/api/logout');
export const updateProfile = (data) => api.post('/api/update-profile', data);
export const questions = (data) => api.post('/api/questions', data);
export const NavSearch = (data) => api.post('/api/search', data);
export const getQuestions = () => api.get('/api/allpost');
export const getOneQuestion = (questionId) => api.get(`/api/qnapage/${questionId}`);
export const postAnswer = (data) => api.post('/api/answer', data);
export const getAnswers = (questionId) => api.get(`/api/get-answers/${questionId}`);
export const like = (data) => api.put('/api/like', data);
export const unlike = (data) => api.put('/api/unlike', data);
export const getAllQuestionsByUser = (userId) => api.get(`/api/get-questions/${userId}`);
export const getUser = (userId) => api.get(`/api/user/${userId}`);
export const follow = (data) => api.put('/api/follow', data);
export const unfollow = (data) => api.put('/api/unfollow', data);

export const getConversations = (userId) => api.get(`/api/chat/conversation/${userId}`);
export const getMessages = (conversationId) => api.get(`/api/chat/messages/${conversationId}`);
export const sendMessage = (data) => api.post('/api/chat/send-message', data);

export const getAllUsers = () => api.get('/api/users');

// create conversation
export const createConversation = (data) => api.post('/api/chat/conversation', data);

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
            console.log(error.message)
        }
    }
    throw error;
});


export default api;