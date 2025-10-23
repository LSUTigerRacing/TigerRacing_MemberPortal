export const ProjectCard = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer max-w-md">

            {/* Card content */}
            <div className="p-6">

                {/* Project title and status badge */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">
                        Formula SAE Engine Development
                    </h3>
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-3">
                        Active
                    </span>
                </div>

                {/* Due date and team size */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Due Date
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                            Mar 15, 2025
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Team
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                            8 Members
                        </div>
                    </div>
                </div>

                {/* Progress section */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-gray-600">Progress</span>
                        <span className="text-sm font-bold" style={{ color: "#510087" }}>67%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            style={{ width: "67%", backgroundColor: "#510087" }}
                            className="h-full rounded-full"
                        />
                    </div>
                </div>

                {/* Bottom section - avatars and priority */}
                <div className="flex items-center justify-between">

                    {/* Team avatars */}
                    <div className="flex items-center -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                            MC
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                            SJ
                        </div>
                        <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                            AR
                        </div>
                    </div>

                    {/* Priority badge */}
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold uppercase border border-red-200">
                        HIGH
                    </div>
                </div>
            </div>
        </div>
    );
};
