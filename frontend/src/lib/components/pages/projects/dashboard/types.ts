import type { ProjectPriority, ProjectStatus, Subsystem } from "../../../../../../../shared/config/enums";
import type { TRAPI } from "../../../../../../../shared/typings/api";

export interface NewProjectProps {
    title: TRAPI.Project["title"]
    description: TRAPI.Project["description"]
    subsystem: Subsystem | undefined
    status: ProjectStatus
    priority: ProjectPriority
    memberEmail: TRAPI.User["email"]
    members: Array<TRAPI.User["email"]>
    page: number
    error: string | undefined
}
