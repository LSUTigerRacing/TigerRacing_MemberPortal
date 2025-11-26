export interface Task {
    taskId: string
    assigner?: string
    taskName: string
    completionStatus: boolean
    startDate: string
    dueDate: string
    description?: string
    createdAt: string
};

export interface TaskSearchDto {
    taskId: string
    taskName?: string
    completionStatus: boolean
    dueDate: string
}

export interface CreateTaskDto {
    taskName: string
    completionStatus: boolean
    dueDate: string
    startDate: string
}
