<script lang="ts">
    import Plus from "@lucide/svelte/icons/plus";
    import Folder from "@lucide/svelte/icons/folder";

    import { onMount } from "svelte";

    import { buttonVariants } from "$lib/components/ui/button";
    import {
        Card,
        CardContent,
        CardHeader
    } from "$lib/components/ui/card";
    import { Dialog, DialogTrigger } from "$lib/components/ui/dialog";
    import {
        Empty,
        EmptyDescription,
        EmptyHeader,
        EmptyMedia,
        EmptyTitle
    } from "$lib/components/ui/empty";
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger
    } from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";

    import NewProjectModal from "$lib/components/pages/projects/dashboard/NewProjectModal.svelte";
    import ProjectCard from "$lib/components/pages/projects/dashboard/ProjectCard.svelte";
    import { initialNewProjectData } from "$lib/components/pages/projects/dashboard/helpers";

    import { API } from "$lib/modules/API";

    import { ProjectPriority, ProjectStatus } from "../../../../shared/config/enums";

    const projects = $state.raw<Awaited<ReturnType<API["fetchProjects"]>>["data"]>([
        {
            id: "1",
            title: "Project 1",
            priority: ProjectPriority.High,
            status: ProjectStatus.Draft,
            deadline: "Dec 1, 2025",
            users: ["T D", "C T", "R L"],
            progress: 25
        },
        {
            id: "2",
            title: "Project 2",
            priority: ProjectPriority.Medium,
            status: ProjectStatus.OnHold,
            deadline: "Dec 2, 2025",
            users: ["T D", "C T", "R L"],
            progress: 67
        },
        {
            id: "3",
            title: "Project 3",
            priority: ProjectPriority.Low,
            status: ProjectStatus.Active,
            deadline: "Dec 2, 2025",
            users: ["T D", "C T", "R L"],
            progress: 93
        },
        {
            id: "4",
            title: "Project 4",
            priority: ProjectPriority.High,
            status: ProjectStatus.Completed,
            deadline: "Dec 2, 2025",
            users: ["T D", "C T", "R L"],
            progress: 55
        }
    ]);

    let animateProgress = $state(false);

    let filters = $state<{
        priority: ProjectPriority | "All Priorities"
        status: ProjectStatus | "All Status"
        title: string
    }>({
        priority: "All Priorities",
        status: "All Status",
        title: ""
    });

    let newProjectData = $state(initialNewProjectData);
    let newProjectModalOpen = $state(false);

    // TODO: Use fuse.js for name matching.
    const titleFilter = $derived(filters.title.toLowerCase());
    const filteredProjects = $derived(
        projects.filter(project => (
            (filters.priority === "All Priorities" || project.priority === filters.priority)
            && (filters.status === "All Status" || project.status === filters.status)
            && (!filters.title || project.title.toLowerCase().includes(titleFilter))
        ))
    );

    onMount(() => {
        const timer = setTimeout(() => animateProgress = true);
        return () => clearTimeout(timer);
    });

</script>

<div class="xl:mt-16.75 px-8 pt-6">
    <Dialog open={newProjectModalOpen}>
        <div class="lg:flex justify-between items-center">
            <h1 class="text-2xl font-bold">Projects</h1>
            <div class="flex flex-col lg:flex-row gap-2 mt-2 lg:mt-0">
                <Input class="lg:w-[300px]!" type="text" placeholder="Search projects..." bind:value={filters.title} autocomplete="off" />
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
                <DialogTrigger class={buttonVariants()} onclick={() => newProjectData = initialNewProjectData}>
                    <Plus strokeWidth="3px" />
                    New Project
                </DialogTrigger>
            </div>
        </div>
        <div class:grid={filteredProjects.length > 0} class="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#if filteredProjects.length > 0}
                {#each filteredProjects as project (project.id)}
                    <ProjectCard project={project} animate={animateProgress} />
                {/each}
            {:else}
                <Card class="bg-background border-background text-background rounded-sm w-full">
                    <CardHeader class="flex flex-col items-center"></CardHeader>
                    <CardContent>
                        <div class="p-8 rounded-sm bg-background">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" class="bg-accent">
                                        <Folder />
                                    </EmptyMedia>
                                    <EmptyTitle class="text-foreground">No Results</EmptyTitle>
                                    <EmptyDescription>
                                        {
                                            /* eslint-disable svelte/indent */
                                            filters.priority === "All Priorities"
                                            && filters.status === "All Status"
                                            && filters.title === ""
                                            /* eslint-enable svelte/indent */
                                                ? "Create a project to get started!"
                                                : "We couldn't find any projects with that criteria."
                                        }
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </div>
                    </CardContent>
                </Card>
            {/if}
        </div>
        <NewProjectModal bind:data={newProjectData} bind:newProjectModalOpen />
    </Dialog>
</div>
