import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

// Define custom error type
export interface ApiError extends Error {
  status?: number;
  data?: any;
}

// Create custom Axios instance
const api: AxiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // For example, add an auth token to the headers
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError) => {
    const customError: ApiError = new Error(error.message);
    customError.status = error.response?.status;
    customError.data = error.response?.data;

    // Handle specific error cases
    switch (error.response?.status) {
      case 401:
        // Handle unauthorized error (e.g., redirect to login)
        console.log("Unauthorized, redirecting to login...");
        // Implement your logic here, e.g., redirect to login page
        break;
      case 404:
        console.log("Resource not found");
        break;
      case 500:
        console.log("Internal server error");
        break;
      default:
        console.log("An error occurred");
    }

    return Promise.reject(customError);
  }
);

export default api;
