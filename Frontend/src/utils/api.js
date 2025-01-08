import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4001/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor for token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');  // Retrieve the token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Attach the token to the Authorization header
        }
        return config;  // Continue with the request
    },
    (error) => {
        return Promise.reject(error);  // If there's an error with the request, reject it
    }
);


// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,  // If the response is successful, just return it
    (error) => {  // If there's an error in the response
        if (error.response?.status === 401) {  // If the error is a 401 Unauthorized status
            localStorage.removeItem('token');  // Remove the token from localStorage
            localStorage.removeItem('role');   // Remove the role from localStorage
            window.location.href = '/loginsignup';  // Redirect the user to the login page
        }
        return Promise.reject(error);  // Reject the response to propagate the error
    }
);


export default api;