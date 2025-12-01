import axios, { AxiosError } from "axios";
import type { User, UserSearchDto, UserUpdateDto } from "@/lib/member-data-format/user.ts";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
    withCredentials: true
});

export const getUsers = async (searchDto?: UserSearchDto): Promise<User[] | undefined> => {
    try {
        const response = await api.get<User[]>("/user", {
            params: searchDto
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    try {
        const response = await api.get<User>(`/user/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateUser = async (id: string, userData: UserUpdateDto): Promise<User | undefined> => {
    try {
        const response = await api.patch<User>(`/user/${id}`, userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteUser = async (id: string, confirmationString = "confirm"): Promise<void> => {
    try {
        await api.delete(`/user/${id}`, {
            params: { confirmationString }
        });
    } catch (error) {
        handleApiError(error);
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
