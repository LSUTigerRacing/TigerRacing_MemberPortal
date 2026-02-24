<script lang="ts">
    import SquarePen from "@lucide/svelte/icons/square-pen";

    import {
        Avatar,
        AvatarFallback,
        AvatarImage
    } from "$lib/components/ui/avatar";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent } from "$lib/components/ui/card";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "$lib/components/ui/dropdown-menu";

    import type { TRAPI } from "../../../../../../../shared/typings/api";

    const { task }: { task: TRAPI.ProjectTask } = $props();
</script>

<Card>
    <CardContent class="flex flex-col">
        <DropdownMenu>
            <DropdownMenuTrigger>
                {#snippet child({ props })}
                    <Button {...props} size="icon" variant="ghost" class="h-8 w-8 p-0 right-0.5 top-0.5 hover:bg-primary hover:text-white hover:border-primary">
                        <SquarePen />
                    </Button>
                {/snippet}
            </DropdownMenuTrigger>
            <DropdownMenuContent></DropdownMenuContent>
        </DropdownMenu>
        <span>{task.title}</span>
        <div>
            {#if task.deadline}
                <!-- todo: use @internationalized/date -->
                <Badge>{task.deadline}</Badge>
            {/if}
        </div>
        <div class="*:data-[slot=avatar]:ring-background flex right-0.5 -space-x-2 *:data-[slot=avatar]:ring-2">
            {#each task.assignees as user, i (i)}
                <Avatar class="size-8">
                    <AvatarImage alt={user} />
                    <AvatarFallback class="text-xs font-semibold">{user.split(" ").map(x => x.substring(0, 1)).join("")}</AvatarFallback>
                </Avatar>
            {/each}
        </div>
    </CardContent>
</Card>
