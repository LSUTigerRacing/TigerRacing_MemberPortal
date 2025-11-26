import axios, { AxiosError } from "axios";
import type { Task, TaskSearchDto, CreateTaskDto } from "@/components/member-data-format/task";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5109/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
    withCredentials: true
});

export const getTask = async (searchDto?: TaskSearchDto): Promise<Task[]> => {
    try {
        const response = await api.get<Task[]>("/task", {
            params: searchDto
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getTaskById = async (id: string): Promise<Task> => {
    try {
        const response = await api.get<Task>(`/task/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const createTask = async (taskData: CreateTaskDto): Promise<Task> => {
    try {
        const response = await api.post<Task>("/task", taskData);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getTaskByUserId = async (id: string): Promise<Task[]> => {
    try {
        const response = await api.get<Task[]>(`task/user/${id}`);
        return response.data;
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
