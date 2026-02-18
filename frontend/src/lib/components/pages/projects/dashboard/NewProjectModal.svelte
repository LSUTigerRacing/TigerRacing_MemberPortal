<script lang="ts">
    import { getLocalTimeZone, today } from "@internationalized/date";

    import AlertCircle from "@lucide/svelte/icons/alert-circle";
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";
    import ArrowRight from "@lucide/svelte/icons/arrow-right";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import X from "@lucide/svelte/icons/x";

    import { Alert, AlertTitle } from "$lib/components/ui/alert";
    import { Badge } from "$lib/components/ui/badge";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Calendar } from "$lib/components/ui/calendar";
    import {
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
        Popover,
        PopoverContent,
        PopoverTrigger
    } from "$lib/components/ui/popover";
    import {
        Select,
        SelectTrigger,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel
    } from "$lib/components/ui/select";
    import { Textarea } from "$lib/components/ui/textarea";

    import type { NewProjectProps } from "./helpers";

    import { api } from "$lib/modules/API";

    import { config } from "../../../../../../../shared/config/config";
    import { ProjectPriority, ProjectStatus } from "../../../../../../../shared/config/enums";

    let {
        data = $bindable(),
        newProjectModalOpen = $bindable()
    }: {
        data: NewProjectProps
        newProjectModalOpen: boolean
    } = $props();

    const subsystemSelectText = $derived(data.subsystem || "Choose a subsystem");
    const statusSelectText = $derived(data.status || "Choose a status");

    function addMember (): void {
        if (!data.memberEmail.endsWith("@lsu.edu")) data.error = "You can only add LSU students!";
        else if (data.members.includes(data.memberEmail)) data.error = "That user is already a member.";
        else data.members.push(data.memberEmail);

        data.memberEmail = "";
    }

    async function createProject (): Promise<void> {
        data.error = "";
        data.loading = true;

        // All subsequent NNAs in this function are because we can assume that
        // all form fields are filled out by the time the submit button is clicked.
        await api.createProject({
            title: data.title,
            subsystem: data.subsystem!,
            status: data.status,
            priority: data.priority,
            startDate: data.startDate.toString(),
            deadline: data.dueDate!.toString()
        }).then(() => {
            newProjectModalOpen = false;
        }).catch(err => {
            console.error(err);
            data.error = "We couldn't create your project. Please notify an admin if the issue persists.";
        }).finally(() => {
            data.loading = false;
        });
    }
</script>

<DialogContent class="lg:max-w-[800px] xl:max-w-[1000px]">
    <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>Fill in the details to get started.</DialogDescription>
    </DialogHeader>
    {#if data.error}
        <Alert variant="destructive" class="bg-muted">
            <AlertCircle />
            <AlertTitle class="line-clamp-none">{data.error}</AlertTitle>
        </Alert>
    {/if}
    {#if data.page === 0}
        <Label for="new-project-name">Project Name</Label>
        <Input class="text-sm" type="text" autocomplete="off" placeholder="Formula SAE Engine Development" required bind:value={data.title} />
        <Label for="new-project-description">Description</Label>
        <Textarea name="project-description" class="resize-none h-[75px] text-sm lg:h-[150px] lg:max-h-[150px]" placeholder="Describe the project's goals and objectives." />
        <div class="flex flex-col lg:grid grid-cols-6 gap-3">
            <div class="grid col-span-3 gap-3">
                <Label for="new-project-subsystem">Subsystem</Label>
                <Select type="single" name="new-project-subsystem" bind:value={data.subsystem} required>
                    <SelectTrigger class="bg-background w-full">{subsystemSelectText}</SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {#each Object.entries(config.systems) as [system, subsystems], i (i)}
                                <SelectLabel>{system}</SelectLabel>
                                {#each subsystems as subsystem, i (i)}
                                    <SelectItem
                                        label={subsystem}
                                        value={subsystem}
                                        disabled={data.subsystem === subsystem}
                                    >
                                        {subsystem}
                                    </SelectItem>
                                {/each}
                            {/each}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div class="grid col-span-2 gap-3">
                <Label for="new-project-status">Status</Label>
                <Select name="new-project-status" type="single" bind:value={data.status}>
                    <SelectTrigger class="bg-background w-full">{statusSelectText}</SelectTrigger>
                    <SelectContent>
                        {#each Object.values(ProjectStatus) as value, i (i)}
                            <SelectItem label={value} {value} disabled={data.status === value}>{value}</SelectItem>
                        {/each}
                    </SelectContent>
                </Select>
            </div>
            <div class="grid col-span-1 gap-2">
                <Label>Priority</Label>
                <div class="grid grid-cols-3 gap-2">
                    {#each Object.values(ProjectPriority) as value, i (i)}
                        <Button
                            class={data.priority === value ? "opacity-100! bg-amber-500 hover:bg-amber-500" : "text-foreground bg-gray-300 hover:bg-gray-500"}
                            disabled={data.priority === value}
                            onclick={() => data.priority = value}>
                            {value.substring(0, 1)}
                        </Button>
                    {/each}
                </div>
            </div>
        </div>
    {:else}
        <Label for="new-project-members">Add Members</Label>
        <form class="flex gap-3" onsubmit={e => (e.preventDefault(), addMember())}>
            <Input
                class="text-sm"
                type="email"
                name="new-project-members"
                autocomplete="off"
                placeholder="Enter an email"
                oninput={() => (data.memberEmail !== "" ? data.error = "" : null)}
                required
                bind:value={data.memberEmail}
            />
            <Button class="text-foreground bg-gray-300 hover:bg-gray-500" type="submit">Add</Button>
        </form>
        <div class="flex flex-wrap gap-1">
            {#each data.members as member, i (i)}
                <Badge class="bg-gray-300 text-foreground font-manrope">
                    {member}
                    <Button
                        class="p-0 m-0 h-6 w-4 hover:text-red-500"
                        size="icon-sm"
                        variant="ghost"
                        onclick={() => data.members.splice(data.members.indexOf(member, 1))}
                    >
                        <X />
                    </Button>
                </Badge>
            {/each}
        </div>
        <div class="grid grid-cols-4 gap-3">
            <div class="grid gap-3 col-span-2 lg:col-span-1">
                <Label>Start Date</Label>
                <Popover bind:open={data.startDateOpen}>
                    <PopoverTrigger>
                        {#snippet child({ props })}
                            <Button
                                {...props}
                                variant="outline"
                                class="justify-between font-normal"
                            >
                                {data.startDate?.toDate(getLocalTimeZone()).toLocaleDateString() ?? "Select date"}
                                <ChevronDown />
                            </Button>
                        {/snippet}
                    </PopoverTrigger>
                    <PopoverContent class="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            type="single"
                            captionLayout="dropdown"
                            onValueChange={() => data.startDateOpen = false}
                            minValue={today(getLocalTimeZone())}
                            bind:value={data.startDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div class="grid gap-3 col-span-2 lg:col-span-1">
                <Label>Due Date</Label>
                <Popover bind:open={data.dueDateOpen}>
                    <PopoverTrigger>
                        {#snippet child({ props })}
                            <Button
                                {...props}
                                variant="outline"
                                class="justify-between font-normal"
                            >
                                {data.dueDate?.toDate(getLocalTimeZone()).toLocaleDateString() ?? "Select date"}
                                <ChevronDown />
                            </Button>
                        {/snippet}
                    </PopoverTrigger>
                    <PopoverContent class="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            type="single"
                            captionLayout="dropdown"
                            onValueChange={() => data.dueDateOpen = false}
                            minValue={today(getLocalTimeZone())}
                            bind:value={data.dueDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div class="hidden lg:block lg:col-span-2"></div>
        </div>
    {/if}
    <DialogFooter>
        {#if data.page === 0}
            <DialogClose class={buttonVariants({ variant: "outline" })}>Cancel</DialogClose>
            <Button onclick={() => data.page++} disabled={!data.title || !data.subsystem}>
                Next
                <ArrowRight />
            </Button>
        {:else}
            <Button variant="outline" onclick={() => data.page--}>
                <ArrowLeft />
                Back
            </Button>
            <Button
                onclick={createProject}
                disabled={!data.dueDate || data.dueDate.toDate(getLocalTimeZone()).valueOf() < data.startDate.toDate(getLocalTimeZone()).valueOf()}
            >Create Project</Button>
        {/if}
    </DialogFooter>
</DialogContent>
