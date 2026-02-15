<script lang="ts">
    import Plus from "@lucide/svelte/icons/plus";

    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Dialog, DialogTrigger } from "$lib/components/ui/dialog";
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger
    } from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";

    import NewProjectModal from "$lib/components/pages/projects/dashboard/NewProjectModal.svelte";
    import ProjectCard from "$lib/components/pages/projects/dashboard/ProjectCard.svelte";

    import { API } from "$lib/modules/API";

    import { ProjectPriority, ProjectStatus } from "../../../../shared/config/enums";

    const projects = $state<Awaited<ReturnType<API["fetchProjects"]>>["data"]>([
        {
            id: "1",
            title: "Project 1",
            priority: ProjectPriority.High,
            status: ProjectStatus.Draft,
            deadline: "Dec 1, 2025",
            users: ["TD", "CT", "RL"],
            progress: 67
        },
        {
            id: "2",
            title: "Project 2",
            priority: ProjectPriority.Medium,
            status: ProjectStatus.OnHold,
            deadline: "Dec 2, 2025",
            users: ["TD", "CT", "RL"],
            progress: 67
        },
        {
            id: "3",
            title: "Project 3",
            priority: ProjectPriority.Low,
            status: ProjectStatus.Active,
            deadline: "Dec 2, 2025",
            users: ["TD", "CT", "RL"],
            progress: 67
        },
        {
            id: "4",
            title: "Project 4",
            priority: ProjectPriority.High,
            status: ProjectStatus.Completed,
            deadline: "Dec 2, 2025",
            users: ["TD", "CT", "RL"],
            progress: 67
        }
    ]);

    let filters = $state<{
        priority: ProjectPriority | "All Priorities"
        status: ProjectStatus | "All Status"
        name: string
    }>({
        priority: "All Priorities",
        status: "All Status",
        name: ""
    });

</script>

<div class="xl:mt-16.75 px-8 pt-6">
    <Dialog>
        <div class="lg:flex justify-between items-center">
            <h1 class="text-2xl font-bold">Projects</h1>
            <div class="flex flex-col lg:flex-row gap-2 mt-2 lg:mt-0">
                <Input class="lg:w-[300px]!" type="text" placeholder="Search projects..." bind:value={filters.name} autocomplete="off" />
                <Select type="single" name="status-select" bind:value={filters.status}>
                    <SelectTrigger class="w-full lg:w-[180px] bg-background">{filters.status}</SelectTrigger>
                    <SelectContent>
                        <SelectItem label="All Status" value="All Status" disabled={filters.status === "All Status"}>All Status</SelectItem>
                        {#each Object.values(ProjectStatus) as value, i (i)}
                            <SelectItem label={value} {value} disabled={filters.status === value}>{value}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
                <Select type="single" name="priority-select" bind:value={filters.priority}>
                    <SelectTrigger class="w-full lg:w-[180px] bg-background">{filters.priority}</SelectTrigger>
                    <SelectContent>
                        <SelectItem label="All Priorities" value="All Priorities" disabled={filters.priority === "All Priorities"}>All Priorities</SelectItem>
                        {#each Object.values(ProjectPriority) as value, i (i)}
                            <SelectItem label={value} {value} disabled={filters.priority === value}>{value}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
                <DialogTrigger class={buttonVariants()}>
                    <Plus strokeWidth="3px" />
                    New Project
                </DialogTrigger>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#each projects as project (project.id)}
                <ProjectCard project={project} />
            {/each}
        </div>
        <NewProjectModal />
    </Dialog>
</div>
