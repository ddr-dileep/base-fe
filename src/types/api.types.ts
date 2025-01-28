export interface LoginRequest {
    email: string
    password: string
  }
  
  export interface LoginResponse {
    access_token: string
    refresh_token: string
  }
  
  export interface User {
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
  }
  
  export interface ApiError {
    message: string
    statusCode: number
  }
  
  