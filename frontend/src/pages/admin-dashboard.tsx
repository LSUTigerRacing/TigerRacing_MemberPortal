import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06";
import { ProjectCard } from "@/components/projectcard";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export const AdminDashboard = () => {
    return (
        <>
            <Navbar06 />
            <div className="min-h-screen bg-white">

                {/* Main content */}
                <main className="px-8 py-6 max-w-[1600px] mx-auto">

                    {/* Page header with filters */}
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                        <div className="flex gap-3 items-center">

                            {/* Search input */}
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-purple-600 w-48"
                            />

                            {/* Status filter */}
                            <Select defaultValue="all-status">
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-status">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="planning">Planning</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="on-hold">On Hold</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Priority filter */}
                            <Select defaultValue="all-priorities">
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="All Priorities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-priorities">All Priorities</SelectItem>
                                    <SelectItem value="high">High Priority</SelectItem>
                                    <SelectItem value="medium">Medium Priority</SelectItem>
                                    <SelectItem value="low">Low Priority</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* New project button */}
                            <Button
                                style={{ backgroundColor: "#510087" }}
                                className="hover:opacity-90"
                            >
                                <span className="text-lg leading-none">+</span> New Project
                            </Button>
                        </div>
                    </div>

                    {/* Projects grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProjectCard />
                    </div>
                </main>
            </div>
        </>
    );
};
