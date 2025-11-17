import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { ProjectCard, type Project } from "@/components/projects/ProjectCard";
import { Input } from "@/components/ui/input";

export default function Projects () {
    // Projects Data
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: "Project 1",
            status: "Planning",
            dueDate: "Dec 1, 2025",
            teamSize: 4,
            progress: 67,
            priority: "HIGH",
            teamMembers: ["TD", "CT", "RL"]
        },
        {
            id: 2,
            title: "Project 2",
            status: "Planning",
            dueDate: "Dec 2, 2025",
            teamSize: 4,
            progress: 67,
            priority: "HIGH",
            teamMembers: ["TD", "CT", "RL"]
        }
    ]);

    // Modal state
    const [showModal, setShowModal] = useState(false);

    // Search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [priorityFilter, setPriorityFilter] = useState("All Priorities");

    // Form fields - Basic Information
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [selectedPriority, setSelectedPriority] = useState<"high" | "medium" | "low">("medium");

    // Form fields - Team & Timeline
    const [teamLead, setTeamLead] = useState("");
    const [memberInput, setMemberInput] = useState("");
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Opens the create project modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Closes modal and resets form
    const handleCloseModal = () => {
        setShowModal(false);
        setProjectName("");
        setDescription("");
        setCategory("");
        setProjectStatus("");
        setSelectedPriority("medium");
        setTeamLead("");
        setMemberInput("");
        setTeamMembers([]);
        setStartDate("");
        setDueDate("");
    };

    // Adds a team member to the list
    const handleAddMember = () => {
        if (memberInput.trim()) {
            setTeamMembers([...teamMembers, memberInput.trim()]);
            setMemberInput("");
        }
    };

    // Removes a team member from the list
    const handleRemoveMember = (index: number) => {
        setTeamMembers(teamMembers.filter((_, i) => i !== index));
    };

    // Creates a new project and adds it to the list
    const handleCreateProject = () => {
        // Validation
        if (!projectName.trim()) {
            alert("Please enter a project name");
            return;
        }
        if (!projectStatus) {
            alert("Please select a status");
            return;
        }
        if (!teamLead.trim()) {
            alert("Please enter a team lead");
            return;
        }
        if (!dueDate) {
            alert("Please select a due date");
            return;
        }

        // Create new project object
        const newProject: Project = {
            id: projects.length + 1,
            title: projectName,
            status: projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1),
            dueDate: dueDate || "TBD",
            teamSize: teamMembers.length + 1,
            progress: 0,
            priority: selectedPriority.toUpperCase(),
            teamMembers: teamMembers.slice(0, 3).map(name => {
                const parts = name.split(" ");
                return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
            })
        };

        // Add to projects array
        setProjects([...projects, newProject]);

        // Close modal and reset
        handleCloseModal();
    };

    // Handles clicking on a project card
    const handleProjectClick = (project: Project) => {
        console.log("Project clicked:", project);
        // You can navigate to project details page here
    };

    // Filtering
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All Status" || project.status === statusFilter;
        const matchesPriority = priorityFilter === "All Priorities" || project.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="xl:mt-16.75">

            {/* Main content */}
            <div className="px-8 py-6 max-w-[1600px] mx-auto xl:mt-16.75">

                {/* Page header with filters */}
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    <div className="flex gap-3 items-center">

                        {/* Search input */}
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search projects..."
                            className="px-4 py-2 border border-gray-300 bg-background rounded-md text-sm focus:outline-none focus:border-purple-600 w-48"
                        />

                        {/* Status filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px] bg-white">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="All Status">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Planning">Planning</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Priority filter */}
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-[150px] bg-white">
                                <SelectValue placeholder="All Priorities" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="All Priorities">All Priorities</SelectItem>
                                <SelectItem value="HIGH">High Priority</SelectItem>
                                <SelectItem value="MEDIUM">Medium Priority</SelectItem>
                                <SelectItem value="LOW">Low Priority</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* New project button */}
                        <Button
                            onClick={handleOpenModal}
                            style={{ backgroundColor: "#510087" }}
                            className="hover:opacity-90"
                        >
                            <span className="text-lg leading-none">+</span> New Project
                        </Button>
                    </div>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={handleProjectClick}
                        />
                    ))}
                </div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No projects found</p>
                    </div>
                )}
            </div>

            {/* CREATE PROJECT MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 flex flex-col overflow-hidden" style={{ maxHeight: "calc(100vh - 4rem)" }}>

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 flex-shrink-0">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900">Create New Project</h2>
                                <p className="text-xs text-slate-500 mt-1">Fill in the details to get started</p>
                            </div>
                            {/* Close button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content - Scrollable form area */}
                        <div className="flex-1 overflow-y-auto py-6">
                            <div className="space-y-6 px-8">

                                {/* SECTION 1: BASIC INFORMATION */}
                                <div className="space-y-4">
                                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-1">
                                        <div className="w-7 h-7 rounded-lg bg-[#510087] flex items-center justify-center text-white text-xs">1</div>
                                        Basic Information
                                    </h3>
                                    <div className="space-y-4 pl-9">

                                        {/* Project Name - Required field */}
                                        <div>
                                            <label htmlFor="project-name" className="block text-xs font-semibold mb-1.5 text-slate-700">
                                                Project Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="project-name"
                                                type="text"
                                                placeholder="e.g., Formula SAE Engine Development"
                                                value={projectName}
                                                onChange={e => setProjectName(e.target.value)}
                                                className="w-full px-3 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#510087] focus:ring-4 focus:ring-[#510087]/10 transition-all"
                                            />
                                        </div>

                                        {/* Description - Optional textarea */}
                                        <div>
                                            <label htmlFor="description" className="block text-xs font-semibold mb-1.5 text-slate-700">Description</label>
                                            <textarea
                                                id="description"
                                                placeholder="Describe the goals and objectives..."
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#510087] focus:ring-4 focus:ring-[#510087]/10 transition-all resize-none"
                                            />
                                        </div>

                                        {/* Category, Status, Priority - 3 column grid */}
                                        <div className="grid grid-cols-[2fr_2fr_1fr] gap-4">

                                            {/* Category dropdown */}
                                            <div>
                                                <label htmlFor="category" className="block text-xs font-semibold mb-1.5 text-slate-700">Category</label>
                                                <Select value={category} onValueChange={setCategory}>
                                                    <SelectTrigger id="category" className="rounded-xl bg-white w-full">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="engine">Engine</SelectItem>
                                                        <SelectItem value="chassis">Chassis</SelectItem>
                                                        <SelectItem value="electronics">Electronics</SelectItem>
                                                        <SelectItem value="aero">Aero & Design</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Status dropdown */}
                                            <div>
                                                <label htmlFor="project-status" className="block text-xs font-semibold mb-1.5 text-slate-700">Status <span className="text-red-500">*</span></label>
                                                <Select value={projectStatus} onValueChange={setProjectStatus}>
                                                    <SelectTrigger id="project-status" className="rounded-xl bg-white w-full">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="planning">Planning</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="on-hold">On Hold</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Priority selector - Button group for visual selection */}
                                            <div>
                                                <div id="priority-label" className="block text-xs font-semibold mb-1.5 text-slate-700">Priority</div>
                                                <div role="group" aria-labelledby="priority-label" className="flex gap-2">
                                                    {["low", "medium", "high"].map(p => (
                                                        <button
                                                            key={p}
                                                            type="button"
                                                            onClick={() => setSelectedPriority(p as "high" | "medium" | "low")}
                                                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                                                selectedPriority === p
                                                                    ? (p === "low" ? "bg-green-500 text-white" : p === "medium" ? "bg-amber-500 text-white" : "bg-red-500 text-white")
                                                                    : "bg-slate-100 text-slate-600"
                                                            }`}
                                                        >
                                                            {p[0].toUpperCase()}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: TEAM & TIMELINE */}
                                <div className="space-y-4">
                                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-1">
                                        <div className="w-7 h-7 rounded-lg bg-[#510087] flex items-center justify-center text-white text-xs">2</div>
                                        Team & Timeline
                                    </h3>
                                    <div className="space-y-4 pl-9">

                                        {/* Team Lead - Required field */}
                                        <div>
                                            <label htmlFor="team-lead" className="block text-xs font-semibold mb-1.5 text-slate-700">
                                                Team Lead <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="team-lead"
                                                type="text"
                                                placeholder="Enter team leader name"
                                                value={teamLead}
                                                onChange={e => setTeamLead(e.target.value)}
                                                className="w-full px-3 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#510087] transition-all"
                                            />
                                        </div>

                                        {/* Team Members - Dynamic list with add/remove functionality */}
                                        <div>
                                            <label htmlFor="team-member-input" className="block text-xs font-semibold mb-1.5 text-slate-700">Team Members</label>
                                            <div className="flex gap-2">
                                                {/* Input for adding members */}
                                                <input
                                                    id="team-member-input"
                                                    type="text"
                                                    placeholder="Add team member"
                                                    value={memberInput}
                                                    onChange={e => setMemberInput(e.target.value)}
                                                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddMember())}
                                                    className="flex-1 px-3 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#510087] transition-all"
                                                />
                                                {/* Add button */}
                                                <Button
                                                    type="button"
                                                    onClick={handleAddMember}
                                                    style={{ backgroundColor: "#510087" }}
                                                    className="hover:opacity-90 px-6 py-2.5 rounded-xl h-auto"
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                            {/* Display added team members as removable tags */}
                                            {teamMembers.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {teamMembers.map((member, index) => (
                                                        <div key={index} className="bg-slate-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                                                            <span className="text-xs font-medium text-slate-700">{member}</span>
                                                            {/* Remove button */}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveMember(index)}
                                                                className="text-slate-400 hover:text-red-500"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Start Date and Due Date - 2 column grid */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* Start Date */}
                                            <div>
                                                <label htmlFor="start-date" className="block text-xs font-semibold mb-1.5 text-slate-700">Start Date</label>
                                                <input
                                                    id="start-date"
                                                    type="date"
                                                    value={startDate}
                                                    onChange={e => setStartDate(e.target.value)}
                                                    className="w-full px-3 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#510087] transition-all"
                                                />
                                            </div>
                                            {/* Due Date - Required field */}
                                            <div>
                                                <label htmlFor="due-date" className="block text-xs font-semibold mb-1.5 text-slate-700">
                                                    Due Date <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="due-date"
                                                    type="date"
                                                    value={dueDate}
                                                    onChange={e => setDueDate(e.target.value)}
                                                    className="w-full px-3 py-2.5 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#510087] transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer - Action buttons */}
                        <div className="flex justify-between items-center px-8 py-5 border-t border-slate-200 flex-shrink-0 bg-slate-50">
                            {/* Required fields note */}
                            <p className="text-xs text-slate-500">
                                <span className="text-red-500">*</span> Required fields
                            </p>
                            {/* Action buttons */}
                            <div className="flex gap-3">
                                {/* Cancel button */}
                                <Button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    variant="outline"
                                    className="rounded-xl px-6"
                                    size="default"
                                >
                                    Cancel
                                </Button>
                                {/* Create button */}
                                <Button
                                    type="button"
                                    onClick={handleCreateProject}
                                    style={{ backgroundColor: "#510087" }}
                                    className="hover:opacity-90 rounded-xl px-8"
                                    size="default"
                                >
                                    Create Project
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
