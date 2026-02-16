import type { API } from "$lib/modules/API";

import { Subsystem, System } from "../../../../../../shared/config/enums";
import type { Unpacked } from "$lib/utils";

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
    activeUser: Unpacked<AdminProps["users"]>["id"]
    filteredCount: number
}
