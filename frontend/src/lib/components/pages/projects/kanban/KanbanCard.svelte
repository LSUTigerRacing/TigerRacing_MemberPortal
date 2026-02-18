<script lang="ts">
    import Ellipsis from "@lucide/svelte/icons/ellipsis";

    import {
        Avatar,
        AvatarFallback,
        AvatarImage
    } from "$lib/components/ui/avatar";
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
    <CardContent>
        <span>{task.title}</span>
        <div class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            {#each task.assignees as user, i (i)}
                <Avatar class="size-8">
                    <AvatarImage alt={user} />
                    <AvatarFallback class="text-xs font-semibold">{user.split(" ").map(x => x.substring(0, 1)).join("")}</AvatarFallback>
                </Avatar>
            {/each}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {#snippet child({ props })}
                        <Button {...props} variant="ghost" class="h-8 w-8 p-0 hover:bg-primary hover:text-white hover:border-primary">
                            <span class="sr-only">Edit card</span>
                            <Ellipsis />
                        </Button>
                    {/snippet}
                </DropdownMenuTrigger>
                <DropdownMenuContent></DropdownMenuContent>
            </DropdownMenu>
        </div>
    </CardContent>
</Card>
