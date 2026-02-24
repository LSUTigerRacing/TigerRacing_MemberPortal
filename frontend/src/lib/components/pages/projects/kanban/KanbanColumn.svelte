<script lang="ts">
    import Circle from "@lucide/svelte/icons/circle";
    import Ellipsis from "@lucide/svelte/icons/ellipsis";
    import Plus from "@lucide/svelte/icons/plus";

    import { Button } from "$lib/components/ui/button";
    import {
        Card,
        CardContent,
        CardHeader,
        CardFooter
    } from "$lib/components/ui/card";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "$lib/components/ui/dropdown-menu";

    import KanbanCard from "./KanbanCard.svelte";

    import type { TRAPI } from "../../../../../../../shared/typings/api";

    const { title, color, tasks }: {
        title: string
        color: string
        tasks: TRAPI.ProjectTask[]
    } = $props();
</script>

<Card>
    <CardHeader>
        <Circle {color} />
        {title}
        <DropdownMenu>
            <DropdownMenuTrigger>
                {#snippet child({ props })}
                    <Button {...props} size="icon" variant="ghost" class="h-8 w-8 p-0 hover:bg-primary hover:text-white hover:border-primary">
                        <Ellipsis />
                    </Button>
                {/snippet}
            </DropdownMenuTrigger>
            <DropdownMenuContent></DropdownMenuContent>
        </DropdownMenu>
    </CardHeader>
    <CardContent>
        {#each tasks as task (task.id)}
            <KanbanCard {task} />
        {/each}
    </CardContent>
    <CardFooter>
        <Button variant="ghost" class="w-full mx-0.5">
            <Plus />
            Add a card
        </Button>
    </CardFooter>
</Card>
