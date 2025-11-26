import type { FC } from "react";

// Define the Project type/interface
export interface Project {
    id: number
    title: string
    status: string
    dueDate: string
    teamSize: number
    progress: number
    priority: string
    teamMembers: string[]
}

// Define props for ProjectCard
interface ProjectCardProps {
    project: Project
    onClick?: (project: Project) => void
}

/**
 * ProjectCard Component - Displays a single project card
 */
export const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onClick && onClick(project)}
        >

            {/* Card content */}
            <div className="p-5">

                {/* Project title and status badge */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">
                        {project.title}
                    </h3>
                    <span
                        className={`text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-3 ${
                            project.status === "Active"
                                ? "bg-green-500"
                                : project.status === "Planning"
                                    ? "bg-yellow-500"
                                    : project.status === "Completed"
                                        ? "bg-blue-500"
                                        : "bg-gray-500"
                        }`}
                    >
                        {project.status}
                    </span>
                </div>

                {/* Due date and team size */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Due Date
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                            {project.dueDate}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Team
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                            {project.teamSize} Members
                        </div>
                    </div>
                </div>

                {/* Progress section */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-gray-600">Progress</span>
                        <span className="text-sm font-bold" style={{ color: "#510087" }}>
                            {project.progress}%
                        </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            style={{ width: `${project.progress}%`, backgroundColor: "#510087" }}
                            className="h-full rounded-full"
                        />
                    </div>
                </div>

                {/* Bottom section - avatars and priority */}
                <div className="flex items-center justify-between">

                    {/* Team avatars */}
                    <div className="flex items-center -space-x-2">
                        {project.teamMembers.slice(0, 3).map((member, index) => (
                            <div
                                key={index}
                                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                                    index === 0
                                        ? "bg-red-500"
                                        : index === 1
                                            ? "bg-green-500"
                                            : "bg-yellow-500"
                                }`}
                            >
                                {member}
                            </div>
                        ))}
                        {project.teamMembers.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                +{project.teamMembers.length - 3}
                            </div>
                        )}
                    </div>

                    {/* Priority badge */}
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${
                            project.priority === "HIGH"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : project.priority === "MEDIUM"
                                    ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                    : "bg-green-50 text-green-600 border-green-200"
                        }`}
                    >
                        {project.priority}
                    </div>
                </div>
            </div>
        </div>
    );
};
