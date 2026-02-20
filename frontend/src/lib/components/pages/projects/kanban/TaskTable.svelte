<script lang="ts">
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow
    } from "$lib/components/ui/table";

    import type { TRAPI } from "../../../../../../../shared/typings/api";

    const tasks = $state<TRAPI.ProjectTask[]>([]);
</script>

<Table>
    <TableHeader>
        <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Due Date</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each tasks as task (task.id)}
            <TableRow>
                <TableCell>
                    
                </TableCell>
            </TableRow>
        {/each}
    </TableBody>
</Table>
