import { getLocalTimeZone, today, type CalendarDate } from "@internationalized/date";

import { ProjectPriority, ProjectStatus, type Subsystem } from "../../../../../../../shared/config/enums.js";
import type { TRAPI } from "../../../../../../../shared/typings/api.js";

export interface NewProjectProps {
    title: TRAPI.Project["title"]
    description: TRAPI.Project["description"]
    subsystem: Subsystem | undefined
    status: ProjectStatus
    priority: ProjectPriority
    memberEmail: TRAPI.User["email"]
    members: Array<TRAPI.User["email"]>
    startDateOpen: boolean
    dueDateOpen: boolean
    startDate: CalendarDate
    dueDate: CalendarDate | undefined
    page: number
    error: string | undefined
    loading: boolean
}

/**
 * Initial new project data.
 */
export const initialNewProjectData: NewProjectProps = {
    title: "",
    description: "",
    subsystem: undefined,
    status: ProjectStatus.Draft,
    priority: ProjectPriority.Medium,
    memberEmail: "",
    members: [],
    startDateOpen: false,
    dueDateOpen: false,
    startDate: today(getLocalTimeZone()),
    dueDate: undefined,
    page: 0,
    error: undefined,
    loading: false
};
