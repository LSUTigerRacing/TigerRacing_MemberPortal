<script lang="ts">
    import Bell from "@lucide/svelte/icons/bell";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import Folder from "@lucide/svelte/icons/folder";
    import Gauge from "@lucide/svelte/icons/gauge";
    import GraduationCap from "@lucide/svelte/icons/graduation-cap";
    import Hamburger from "@lucide/svelte/icons/hamburger";
    import LogOut from "@lucide/svelte/icons/log-out";
    import Mail from "@lucide/svelte/icons/mail";
    import Settings from "@lucide/svelte/icons/settings";
    import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
    import User from "@lucide/svelte/icons/user";
    import UserCog from "@lucide/svelte/icons/user-cog";

    import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger
    } from "$lib/components/ui/dropdown-menu";
    import {
        NavigationMenuRoot,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList
    } from "$lib/components/ui/navigation-menu";
    import {
        Popover,
        PopoverContent,
        PopoverTrigger
    } from "$lib/components/ui/popover";

    import LogoImg from "$lib/img/logos/logo.png";
    import { IsMobile } from "$lib/hooks/is-mobile.svelte";

    interface NavbarItem {
        title: string
        href?: string
    }

    const NavigationLinks: NavbarItem[] = [
        {
            title: "About",
            href: "https://formulalsu.org"
        },
        {
            title: "Wiki",
            href: "https://wiki.formulalsu.org"
        },
        {
            title: "Join Us",
            href: "https://formulalsu.org/apply"
        }
    ];

    let userName = $state("Car McCarface");
    let userAvatar = $state(null);
    let userEmail = $state("cmccarface1@lsu.edu");
    let notificationCount = $state(1);

    const isMobileInstance = new IsMobile();
    const isMobile = $derived(isMobileInstance.current);
</script>

<header class="xl:fixed top-0 z-50 w-full border-b-3 shadow-md border-primary bg-background px-4 md:px-6 **:no-underline">
    <div class="flex h-16 items-center justify-between gap-4">
        <div class="flex items-center gap-2">
            {#if isMobile}
                <Popover>
                    <PopoverTrigger>
                        {#snippet child({ props })}
                            <Button
                                {...props}
                                class="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                variant="ghost"
                                size="icon"
                            >
                                <Hamburger />
                            </Button>
                        {/snippet}
                    </PopoverTrigger>
                    <PopoverContent align="start" class="w-64 p-1">
                        <NavigationMenuRoot class="max-w-none">
                            <NavigationMenuList class="flex-col items-start gap-0">
                                {#each NavigationLinks as link, index (index)}
                                    <NavigationMenuItem class="w-full">
                                        <button
                                            onclick={e => {
                                                e.preventDefault();
                                                if (link.href) window.open(link.href, "_blank");
                                            }}
                                            class="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground no-underline"
                                        >
                                            {link.title}
                                        </button>
                                    </NavigationMenuItem>
                                {/each}
                            </NavigationMenuList>
                        </NavigationMenuRoot>
                    </PopoverContent>
                </Popover>
            {/if}
            <div class="flex items-center gap-6">
                <button
                    onclick={() => window.open("/", "_self")}
                    class="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                >
                    <div class="text-2xl">
                        <img class="w-auto h-11 align-middle inline-block select-none" src={LogoImg} alt="TigerRacing purple logo" />
                    </div>
                </button>
                {#if !isMobile}
                    <NavigationMenuRoot class="flex">
                        <NavigationMenuList class="gap-1">
                            {#each NavigationLinks as link, index (index)}
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href={link.href}
                                        onclick={e => {
                                            e.preventDefault();
                                            if (link.href) window.open(link.href, "_blank");
                                        }}
                                        class="text-muted-foreground hover:text-primary font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {link.title}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            {/each}
                        </NavigationMenuList>
                    </NavigationMenuRoot>
                {/if}
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        {#snippet child({ props })}
                            <Button {...props} variant="ghost" size="icon" class="h-9 w-9 relative">
                                <Bell class="h-4 w-4" />
                                {#if notificationCount > 0}
                                    <Badge class="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                                        {notificationCount > 9 ? "9+" : notificationCount}
                                    </Badge>
                                {/if}
                                <span class="sr-only">Notifications</span>
                            </Button>
                        {/snippet}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onclick={() => false /* onItemClick?.("notification1") */}>
                            <div class="flex flex-col gap-1">
                                <p class="text-sm font-medium">Ricky is a bum</p>
                                <p class="text-xs text-muted-foreground">Just now</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onclick={() => window.open("/dashboard", "_self")}>
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {#snippet child({ props })}
                        <Button {...props} variant="ghost" class="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground">
                            <Avatar class="h-7 w-7">
                                <AvatarImage src={userAvatar} alt={userName} />
                                <AvatarFallback class="text-xs">
                                    {userName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <ChevronDown class="h-3 w-3 ml-1" />
                            <span class="sr-only">User menu</span>
                        </Button>
                    {/snippet}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-56">
                    <DropdownMenuLabel>
                        <div class="flex flex-col space-y-1">
                            <p class="text-sm font-medium leading-none">{userName}</p>
                            <p class="text-xs leading-none text-muted-foreground">
                                {userEmail}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onclick={() => window.open("/dashboard", "_self")}>
                        <Gauge />
                        Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => window.open("/profile", "_self")}>
                        <User />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => window.open("/mail", "_self")}>
                        <Mail />
                        Inbox
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => window.open("/projects", "_self")}>
                        <Folder />
                        Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => window.open("/orders", "_self")}>
                        <ShoppingCart />
                        Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => window.open("/admin", "_self")}>
                        <UserCog />
                        Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onclick={() => window.open("/settings", "_self")}>
                        <Settings />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onclick={() => window.open("/wiki", "_self")}>
                        <GraduationCap />
                        Wiki
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onclick={() => window.open("/logout", "_self")}>
                        <LogOut />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</header>
