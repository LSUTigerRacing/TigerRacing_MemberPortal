<script lang="ts">
    import ArrowLeftFromLine from "@lucide/svelte/icons/arrow-left-from-line";
    import TriangleAlert from "@lucide/svelte/icons/triangle-alert";

    import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle
    } from "$lib/components/ui/card";
    import {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselNext,
        CarouselPrevious
    } from "$lib/components/ui/carousel";
    import type { CarouselAPI } from "$lib/components/ui/carousel/context";
    import {
        Empty,
        EmptyDescription,
        EmptyHeader,
        EmptyMedia,
        EmptyTitle
    } from "$lib/components/ui/empty";
    import { Separator } from "$lib/components/ui/separator";

    import UserDropdown from "./UserDropdown.svelte";
    import { ViewMode, type AdminProps } from "./types";

    let {
        viewMode = $bindable(),
        activeUser = $bindable(),
        users
    }: Pick<AdminProps, "viewMode" | "activeUser" | "users"> = $props();

    let carouselAPI = $state<CarouselAPI | undefined>();

    $effect(() => {
        if (!carouselAPI || !activeUser) return;

        const i = users.findIndex(user => user.id === activeUser);
        if (i !== -1) carouselAPI.scrollTo(i, true);
    });

    function setCarouselAPI (api: CarouselAPI | undefined): void {
        carouselAPI = api;
    }
</script>

<div class="flex flex-col justify-center mt-3 sm:flex-row">
    {#if users.length > 0}
        <Button
            size="icon"
            variant="ghost"
            class="text-muted-foreground w-10 h-10 rounded-full shadow-none"
            onclick={() => viewMode = ViewMode.List}
            aria-label="Back to column view"
        >
            <ArrowLeftFromLine class="scale-115 text-red-500" />
        </Button>
        <Carousel class="w-3/4 xl:w-1/2" setApi={setCarouselAPI}>
            <CarouselContent>
                {#each users as user, i (i)}
                    <CarouselItem>
                        <div class="p-2">
                            <Card>
                                <CardHeader>
                                    <div class="flex flex-col items-center justify-between xl:flex-row xl:items-start">
                                        <div class="flex flex-col lg:flex-row items-center">
                                            <div class="aspect-square me-4">
                                                <Avatar class="h-32 w-32">
                                                    <AvatarImage
                                                        src="https://github.com/shadcn.png"
                                                        alt="@shadcn"
                                                    />
                                                    <AvatarFallback>CM</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <CardTitle class="text-2xl">{user.name}</CardTitle>
                                                <CardDescription class="flex flex-col items-center mt-4 xl:mt-1 xl:flex-row xl:items-start font-manrope gap-1">
                                                    <Badge class="bg-accent text-black">Class of {user.gradYear}</Badge>
                                                    <Badge class="bg-accent text-black">{user.system}</Badge>
                                                    <Badge class="bg-accent text-black">{user.subsystem}</Badge>
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <UserDropdown user={user} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div class="flex flex-col xl:grid xl:grid-cols-3 gap-3">
                                        <span class="text-center">Info</span>
                                        <span class="text-center">Projects</span>
                                        <span class="text-center">Other</span>
                                        <Separator class="my-2" />
                                        <Separator class="my-2" />
                                        <Separator class="my-2" />
                                        <div class="flex flex-col gap-2">
                                            <Badge class="bg-accent text-black"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</Badge>
                                            <Badge class="bg-accent text-black"><strong>Hazing Form:</strong> {user.hazingStatus ? "Completed" : "Incomplete"}</Badge>
                                            <Badge class="bg-accent text-black"><strong>Fees:</strong> {user.feeStatus ? "Paid" : "Unpaid"}</Badge>
                                            <Badge class="bg-accent text-black"><strong>Shirt Size:</strong> {user.shirtSize}</Badge>
                                        </div>
                                        <div class="flex flex-col gap-2 items-center">
                                            <span class="text-xs">Coming Soon!</span>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <span class="text-xs">Within every relationship there is the oppressed and the oppressor. The oppressor is that whom "others" others.</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardFooter>
                                    <span class="text-xs text-gray-400">Last updated: {new Date(user.updatedAt).toLocaleDateString()}</span>
                                </CardFooter>
                            </Card>
                        </div>
                    </CarouselItem>
                {/each}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    {:else}
        <!-- Despite the fact that this should never be displayed, will include a fallback anyway. -->
        <Card class="bg-background border-background text-background rounded-sm grow">
            <CardHeader class="flex flex-col items-center"></CardHeader>
            <CardContent>
                <div class="p-8 rounded-sm bg-background">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon" class="bg-accent">
                                <TriangleAlert />
                            </EmptyMedia>
                            <EmptyTitle class="text-foreground">No Users</EmptyTitle>
                            <EmptyDescription>Invite someone to the portal!</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </div>
            </CardContent>
        </Card>
    {/if}
</div>
