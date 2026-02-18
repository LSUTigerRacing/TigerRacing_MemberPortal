<script lang="ts">
    import {
        Card,
        CardContent,
        CardHeader,
        CardFooter
    } from "$lib/components/ui/card";

    import type { TRAPI } from "../../../../../../../shared/typings/api";

    const { tasks }: { tasks: TRAPI.ProjectTask[]} = $props();
</script>

{#each tasks as task (task.id)}
    <Card>
        <CardHeader>

        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
    </Card>
{#each}
