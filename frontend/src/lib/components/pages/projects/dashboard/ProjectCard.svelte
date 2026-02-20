<script lang="ts">
    import {
        Avatar,
        AvatarFallback,
        AvatarImage
    } from "$lib/components/ui/avatar";
    import { Badge } from "$lib/components/ui/badge";
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle
    } from "$lib/components/ui/card";
    import { Progress } from "$lib/components/ui/progress";

    import type { Unpacked } from "$lib/utils";
    import type { API } from "$lib/modules/API";

    import { ProjectPriority, ProjectStatus } from "../../../../../../../shared/config/enums";

    const {
        project,
        animate
    }: {
        project: Unpacked<Awaited<ReturnType<API["fetchProjects"]>>["data"]>
        animate: boolean
    } = $props();

    /* eslint-disable svelte/indent */
    let statusColor = $derived(
        project.status === ProjectStatus.Draft
            ? "bg-gray-500"
            : project.status === ProjectStatus.OnHold
                ? "bg-amber-500"
                : project.status === ProjectStatus.Active
                    ? "bg-green-500"
                    : "bg-primary"
    );

    let priorityColor = $derived(
        project.priority === ProjectPriority.High
            ? "bg-red-50 text-red-600 border-red-200"
            : project.priority === ProjectPriority.Medium
                ? "bg-amber-50 text-amber-600 border-amber-200"
                : "bg-green-50 text-green-600 border-green-200"
    );
    /* eslint-enable svelte/indent */
</script>

<Card class="gap-2 cursor-pointer transition-all hover:shadow-lg motion-safe:hover:scale-95 motion-safe:active:scale-90" onclick={() => window.open(`/projects/${project.id}`, "_self")}>
    <CardHeader>
        <div class="flex justify-between items-center">
            <CardTitle class="text-md">{project.title}</CardTitle>
            <CardDescription>
                <Badge class="px-3 py-1 {statusColor}">{project.status}</Badge>
            </CardDescription>
        </div>
    </CardHeader>
    <CardContent>
        <div class="grid grid-cols-2 gap-1">
            <span class="text-xs text-gray-500 font-bold font-manrope uppercase">Due Date</span>
            <span class="text-xs text-gray-500 font-bold font-manrope uppercase">Team</span>
            <span class="text-sm font-semibold">{new Date(project.deadline).toLocaleDateString()}</span>
            <span class="text-sm font-semibold">{project.users.length} {project.users.length === 1 ? "Member" : "Members"}</span>
        </div>
        <div class="flex justify-between items-center mt-4 mb-2">
            <span class="text-xs text-gray-500">Progress</span>
            <span class="text-sm text-primary font-bold">{project.progress}%</span>
        </div>
        <Progress value={animate ? project.progress : 0} />
        <div class="flex justify-between items-center mt-4">
            <div class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                {#each project.users as user, i (i)}
                    <Avatar class="size-8">
                        <AvatarImage alt={user} />
                        <AvatarFallback class="text-xs font-semibold">{user.split(" ").map(x => x.substring(0, 1)).join("")}</AvatarFallback>
                    </Avatar>
                {/each}
            </div>
            <Badge class="font-semibold uppercase px-2 py-1 {priorityColor}">{project.priority}</Badge>
        </div>
    </CardContent>
</Card>
