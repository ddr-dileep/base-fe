import api, { type ApiError } from "./axiosConfig";

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export const fetchData = async <T>(): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<T>("/data");
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error as ApiError;
  }
};

export const postData = async <T>(data: any): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<T>("/data", data);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error as ApiError;
  }
};

export const putData = async <T>(
  id: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put<T>(`/data/${id}`, data);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error as ApiError;
  }
};

export const deleteData = async <T>(id: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete<T>(`/data/${id}`);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error as ApiError;
  }
};

// Example of an authenticated request
export const fetchProtectedData = async <T>(): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<T>("/protected-data");
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error as ApiError;
  }
};
