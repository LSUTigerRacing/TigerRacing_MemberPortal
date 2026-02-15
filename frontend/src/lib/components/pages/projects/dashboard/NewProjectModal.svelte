<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import {
        Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle
    } from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import {
        Select,
        SelectTrigger,
        SelectContent,
        SelectItem
    } from "$lib/components/ui/select";
    import { Textarea } from "$lib/components/ui/textarea";

    import { Subsystem } from "../../../../../../../shared/config/enums";
</script>

<form action="">
    <DialogContent class="lg:max-w-[800px] xl:max-w-[1000px]">
        <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Fill in the details to get started.</DialogDescription>
        </DialogHeader>
        <Label for="project-name">Project Name</Label>
        <Input id="project-name" type="text" autocomplete="off" placeholder="Formula SAE Engine Development" required />
        <Label for="project-description">Description</Label>
        <Textarea id="project-description" class="resize-none h-[150px] max-h-[150px]" placeholder="Describe the project's goals and objectives." />
        <div class="flex justify-between">
            <div>
                <Label for="project-description">Subsystem</Label>
                <Select type="single" name="new-subsystem-select" bind:value={filters.status}>
                    <SelectTrigger class="w-full lg:w-[180px] bg-background">{filters.status}</SelectTrigger>
                    <SelectContent>
                        <SelectItem label="All Status" value="All Status" disabled={filters.status === "All Status"}>All Status</SelectItem>
                        {#each Object.values(Subsystem) as value, i (i)}
                            <SelectItem label={value} {value} disabled={filters.status === value}>{value}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <DialogFooter>
            <DialogClose class={buttonVariants({ variant: "outline" })}>Cancel</DialogClose>
            <Button type="submit">Create Project</Button>
        </DialogFooter>
    </DialogContent>
</form>
