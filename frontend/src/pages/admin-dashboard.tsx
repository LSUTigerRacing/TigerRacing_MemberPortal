import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06";
import { ProjectCard } from "@/components/projectcard";

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
                            <select className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white cursor-pointer focus:outline-none">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Planning</option>
                                <option>Completed</option>
                                <option>On Hold</option>
                            </select>

                            {/* Priority filter */}
                            <select className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white cursor-pointer focus:outline-none">
                                <option>All Priorities</option>
                                <option>High Priority</option>
                                <option>Medium Priority</option>
                                <option>Low Priority</option>
                            </select>

                            {/* New project button */}
                            <button
                                style={{ backgroundColor: "#510087" }}
                                className="text-white px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
                            >
                                <span className="text-lg">+</span> New Project
                            </button>
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
