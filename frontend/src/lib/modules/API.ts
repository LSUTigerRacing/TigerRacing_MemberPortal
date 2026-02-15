import { Axios, type AxiosResponse } from "axios";

import type { TRAPI } from "../../../../shared/typings/api.js";

type MutableDocument<T extends Record<"id" | "createdAt" | "updatedAt", string>> = Omit<T, "id" | "createdAt" | "updatedAt">;

// Types that are too long to inline.
type CreateProjectBody = Pick<TRAPI.Project, "title" | "subsystem" | "status" | "startDate" | "deadline">
    & Partial<Pick<TRAPI.Project, "description" | "priority">
    & { author: TRAPI.User["email"], users: Array<TRAPI.User["email"]> }>;

/**
 * Interface to interact with the TigerRacing API.
 */
export class API extends Axios {
    constructor () {
        super({
            baseURL: "/api",
            withCredentials: true,
            validateStatus: function (status) {
                // For some reason, axios won't reject Promises for 5xx by default...
                return status >= 200 && status < 400;
            }
        });
    }

    /**
     * Fetch dashboard data.
     */
    fetchDashboardInfo = async () => await this.get<TRAPI.DashboardInfo>("/dashboard");

    /**
     * Fetch all orders.
     */
    fetchOrders = async () => await this.get<Omit<TRAPI.Order, "items" | "notes" | "createdAt" | "updatedAt">>("/orders/list");

    /**
     * Fetch a specific order.
     * @param id The order ID.
     */
    fetchOrder = async (id: TRAPI.Order["id"]) => await this.get<TRAPI.Order>(`/orders/fetch?id=${id}`);

    /**
     * Update an order.
     * @param id The order ID.
     * @param data Data to upsert.
     */
    updateOrder = async (
        id: TRAPI.Order["id"],
        data: Partial<MutableDocument<TRAPI.Order>>
    ) => await this.patch<TRAPI.User, AxiosResponse<TRAPI.User>, Partial<MutableDocument<TRAPI.Order>>>(`/orders/update?id=${id}`, data);

    /**
     * Review an order.
     * @param id The order ID.
     * @param data Whether the order was approved or denied.
     * @todo Check if we need update / deletion of reviews, as we don't delete orders anyway.
     */
    createOrderReview = async (id: TRAPI.Order["id"], data: TRAPI.OrderReview["value"]) => await this.post<boolean, AxiosResponse<boolean>, TRAPI.OrderReview["value"]>(`/orders/review?id=${id}`, data);

    /**
     * Fetch all projects.
     */
    fetchProjects = async () => await this.get<Array<Pick<TRAPI.Project, "id" | "title" | "priority" | "status" | "deadline"> & { users: Array<TRAPI.ProjectUser["name"]>, progress: number }>>("/projects/list");

    /**
     * Fetch a specific project.
     * @param id The project ID.
     */
    fetchProject = async (id: TRAPI.Project["id"]) => await this.get<TRAPI.Project>(`/projects/fetch?id=${id}`);

    /**
     * Create a project.
     * @param data Project creation data.
     */
    createProject = async (data: CreateProjectBody) => await this.post<boolean, AxiosResponse<boolean>, CreateProjectBody>("/projects/create", data);

    /**
     * Update a given project.
     * @param id The project ID.
     * @param data Data to upsert.
     */
    updateProject = async (
        id: TRAPI.Project["id"],
        data: Partial<MutableDocument<Omit<TRAPI.Project, "tasks" | "users">>>
    ) => await this.patch<
        boolean,
        AxiosResponse<boolean>,
        Partial<MutableDocument<Omit<TRAPI.Project, "tasks" | "users">>>
    >(`/projects/update?id=${id}`, data);

    /**
     * Delete a project.
     * @param id The order ID.
     */
    deleteProject = async (id: TRAPI.Project["id"]) => await this.delete<boolean>(`/projects/delete?id=${id}`);

    /**
     * Create a project task.
     * @param data Task creation data.
     * @todo Replace `status` with some category-like instance variable that represents the column the task is currently located in. Also find a better endpoint.
     */
    createProjectTask = async (id: TRAPI.Project["id"], data: Pick<TRAPI.ProjectTask, "title" | "status">) => await this.post<boolean, AxiosResponse<boolean>, Pick<TRAPI.ProjectTask, "title" | "status">>(`/projects/tasks/create?id=${id}`, data);

    /**
     * Update a given project task.
     * @param id The task ID.
     * @param data Data to upsert.
     * @todo Once again, find a better endpoint.
     */
    updateProjectTask = async (
        id: TRAPI.ProjectTask["id"],
        data: Partial<MutableDocument<Omit<TRAPI.Project, "tasks" | "users">>>
    ) => await this.patch<
        boolean,
        AxiosResponse<boolean>,
        Partial<MutableDocument<Omit<TRAPI.Project, "tasks" | "users">>>
    >(`/projects/tasks/update?id=${id}`, data);

    /**
     * Delete a project task.
     * @param id The task ID.
     * @todo Find a better endpoint.
     */
    deleteProjectTask = async (id: TRAPI.ProjectTask["id"]) => await this.delete<boolean>(`/projects/tasks/delete?id=${id}`);

    /**
     * Fetch all users.
     */
    fetchUsers = async () => await this.get<TRAPI.User[]>("/users/list");

    // TODO: Optimize to use this definition of fetchUsers().
    // fetchUsers = async () => this.get<Array<Pick<TRAPI.User, "id" | "name" | "system" | "subsystem" | "gradYear">>>("/users/list");

    /**
     * Fetch a specific user's information.
     * @param id The user's ID.
     */
    fetchUser = async (id: TRAPI.User["id"]) => await this.get<TRAPI.User>(`/users/fetch?id=${id}`);

    /**
     * Update a user.
     * @param id The user ID.
     * @param data Data to upsert.
     */
    updateUser = async (
        id: TRAPI.User["id"],
        data: Partial<MutableDocument<TRAPI.User>>
    ) => await this.patch<boolean, AxiosResponse<boolean>, Partial<MutableDocument<TRAPI.User>>>(`/users/update?id=${id}`, data);

    /**
     * Delete a user.
     * @param id The order ID.
     */
    deleteUser = async (id: TRAPI.User["id"]) => await this.delete<boolean>(`/users/delete?id=${id}`);
}

export const api = new API();
