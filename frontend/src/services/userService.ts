import axios, { AxiosError } from "axios";
import type { User, UserSearchDto, UserUpdateDto } from "@/components/dummyData/user.ts";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5096/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
    withCredentials: true
});

export const getUsers = async (searchDto?: UserSearchDto): Promise<User[]> => {
    try {
        const response = await api.get<User[]>("/user", {
            params: searchDto
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getUserById = async (id: string): Promise<User> => {
    try {
        const response = await api.get<User>(`/user/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const updateUser = async (id: string, userData: UserUpdateDto): Promise<User> => {
    try {
        const response = await api.patch<User>(`/user/${id}`, userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const deleteUser = async (id: string, confirmationString = "confirm"): Promise<void> => {
    try {
        await api.delete(`/user/${id}`, {
            params: { confirmationString }
        });
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string, title?: string }>;
        const errorMessage = axiosError.response?.data?.message || axiosError.response?.data?.title || axiosError.message;

        console.error("API Error: ", errorMessage);
        console.error("Status: ", axiosError.response?.status);
        console.error("Full Error: ", axiosError.response?.data);
    } else {
        console.error("Unexpected error: ", error);
    }
};

export default api;
