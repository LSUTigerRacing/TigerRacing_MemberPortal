<script lang="ts">
    import {
        CalendarClock,
        CalendarDays,
        CircleUser,
        ClipboardList,
        Clock,
        FileText,
        Folder,
        GraduationCap,
        ListChecks,
        Mail,
        Megaphone,
        Presentation,
        Settings,
        ShoppingCart,
        UserCog
    } from "@lucide/svelte";

    import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle
    } from "$lib/components/ui/card";
    import {
        Empty,
        EmptyDescription,
        EmptyHeader,
        EmptyMedia,
        EmptyTitle
    } from "$lib/components/ui/empty";
    import { Separator } from "$lib/components/ui/separator";

    import AnnouncementCard from "$lib/components/pages/dashboard/AnnouncementCard.svelte";
    import DeadlineCard from "$lib/components/pages/dashboard/DeadlineCard.svelte";
    import EventCard from "$lib/components/pages/dashboard/EventCard.svelte";
    import SidebarButton from "$lib/components/pages/dashboard/SidebarButton.svelte";
    import TaskCard from "$lib/components/pages/dashboard/TaskCard.svelte";

    const data = $state({
        name: "Car McCarface",
        avatar: "",
        tasks: [],
        announcements: [],
        deadlines: [],
        events: []
    });
</script>

<div class="flex flex-col xl:flex-row w-full xl:h-dvh">
    <!-- for accessibility scoring on dashboard -->
    <h1 class="hidden">Dashboard</h1>

    <!-- Sidebar -->
    <Card class="w-full xl:max-w-xs h-screen rounded-none bg-accent shadow-none gap-2">
        <CardHeader class="xl:mt-16.75">
            <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2">
                <SidebarButton title="Projects" url="/projects" icon={Folder} />
                <SidebarButton title="Orders" url="/orders" icon={ShoppingCart} />
                <SidebarButton title="Inbox" url="/mail" icon={Mail} />
                <SidebarButton title="Profile" url="/profile" icon={CircleUser} />
                <SidebarButton title="Settings" url="/settings" icon={Settings} />
            </div>
        </CardContent>
        <CardHeader class="mt-4">
            <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent class="h-full">
            <div class="flex flex-col gap-2 h-full">
                <SidebarButton title="Wiki" url="/wiki" icon={GraduationCap} />
                <SidebarButton title="Documentation" url="/docs" icon={FileText} />
                <div class="grow"></div>
                <SidebarButton title="Admin" url="/admin" icon={UserCog} />
            </div>
        </CardContent>
    </Card>

    <!-- Main Dashboard -->
    <div class="sm:px-4 xl:p-8 grow mt-16 overflow-auto">
        <div class="flex flex-col lg:flex-row gap-4">
            <Card class="bg-primary border-primary text-background rounded-sm lg:max-w-xs px-4 pt-8">
                <CardContent class="flex flex-col items-center">
                    <Avatar class="mb-4 max-w-xs w-64 h-64">
                        {#if data.avatar}
                            <AvatarImage src={data.avatar} alt="User profile picture" />
                            <AvatarFallback class="bg-secondary text-primary text-8xl">{data.name.split(" ").map(x => x.substring(0, 1)).join("") ?? "CM"}</AvatarFallback>
                        {/if}
                    </Avatar>
                    <span class="mt-4 text-2xl">Hi, {data.name ?? "Car McCarface"}!</span>
                </CardContent>
            </Card>
            <Card class="bg-primary border-primary text-background rounded-sm grow">
                <CardHeader class="flex flex-col items-center">
                    <h2 class="flex items-center">
                        <ClipboardList class="me-2" />
                        My Tasks
                    </h2>
                    <Separator class="mt-1.75" />
                </CardHeader>
                <CardContent>
                    <div class="p-8 rounded-sm bg-background">
                        {#if data.tasks.length}
                            {#each data.tasks as x, i (i)}
                                <TaskCard data={x} />)
                            {/each}
                        {:else}
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" class="bg-accent">
                                        <ListChecks />
                                    </EmptyMedia>
                                    <EmptyTitle class="text-foreground">No Tasks</EmptyTitle>
                                    <EmptyDescription>You don't have any tasks!</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        {/if}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div class="flex flex-col lg:flex-row gap-4 my-4">
            <Card class="bg-background text-foreground rounded-sm grow">
                <CardHeader class="flex flex-col items-center">
                    <h2 class="flex items-center">
                        <CalendarClock class="me-2" />
                        Announcements
                    </h2>
                    <Separator class="mt-1.75" />
                </CardHeader>
                <CardContent>
                    <!-- TODO: Replace this with something else. -->
                    {#if data.announcements.length}
                        {#each data.announcements as x, i (i)}
                            <AnnouncementCard data={x} />)
                        {/each}
                    {:else}
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon" class="bg-accent">
                                    <Megaphone />
                                </EmptyMedia>
                                <EmptyTitle class="text-foreground">No Announcements</EmptyTitle>
                                <EmptyDescription>Nothing new today.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    {/if}
                </CardContent>
            </Card>
            <Card class="bg-background text-foreground rounded-sm grow">
                <CardHeader class="flex flex-col items-center">
                    <h2 class="flex items-center">
                        <CalendarClock class="me-2" />
                        Upcoming Deadlines
                    </h2>
                    <Separator class="mt-1.75" />
                </CardHeader>
                <CardContent>
                    <!-- TODO: Replace this with something else. -->
                    {#if data.deadlines.length}
                        {#each data.deadlines as x, i (i)}
                            <DeadlineCard data={x} />)
                        {/each}
                    {:else}
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon" class="bg-accent">
                                    <Clock />
                                </EmptyMedia>
                                <EmptyTitle class="text-foreground">No Upcoming Deadlines</EmptyTitle>
                                <EmptyDescription>You're all caught up!</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    {/if}
                </CardContent>
            </Card>
            <Card class="bg-background text-foreground rounded-sm grow">
                <CardHeader class="flex flex-col items-center">
                    <h2 class="flex items-center">
                        <CalendarDays class="me-2" />
                        Upcoming Events
                    </h2>
                    <Separator class="mt-1.75" />
                </CardHeader>
                <CardContent>
                    {#if data.events.length}
                        {#each data.events as x, i (i)}
                            <EventCard data={x} />)
                        {/each}
                    {:else}
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon" class="bg-accent">
                                    <Presentation />
                                </EmptyMedia>
                                <EmptyTitle class="text-foreground">No Upcoming Events</EmptyTitle>
                                <EmptyDescription>Take it nice and easy.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    {/if}
                </CardContent>
            </Card>
        </div>
    </div>
</div>
