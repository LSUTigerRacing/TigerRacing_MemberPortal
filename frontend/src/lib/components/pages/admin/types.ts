import type { API } from "$lib/API";

import { Subsystem, System } from "../../../../../../shared/config/enums";

export enum ViewMode {
    Gallery,
    List
}

export enum SortOrder {
    Ascending,
    Descending
}

/**
 * All possible props passed to child components of admin page.
 */
export interface AdminProps {
    viewMode: ViewMode
    sortOrder: SortOrder
    filters: {
        systems: System[]
        subsystems: Subsystem[]
        years: number[]
        name: string
    }
    users: Awaited<ReturnType<API["fetchUsers"]>>["data"]
    activeUser: number
    filteredCount: number
}
