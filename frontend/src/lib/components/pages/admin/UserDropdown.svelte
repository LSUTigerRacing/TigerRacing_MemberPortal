<script lang="ts">
    import Ellipsis from "@lucide/svelte/icons/ellipsis";

    import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle
    } from "$lib/components/ui/alert-dialog";
    import { Button } from "$lib/components/ui/button";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuSeparator,
        DropdownMenuLabel,
        DropdownMenuTrigger
    } from "$lib/components/ui/dropdown-menu";

    import { api } from "$lib/modules/API";
    import type { Unpacked } from "$lib/utils";
    import type { AdminProps } from "./types";

    const { user }: { user: Unpacked<AdminProps["users"]> } = $props();
    let open = $state(false);
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        {#snippet child({ props })}
            <Button {...props} variant="ghost" class="h-8 w-8 p-0 hover:bg-primary hover:text-white hover:border-primary">
                <span class="sr-only">Open menu</span>
                <Ellipsis />
            </Button>
        {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="bg-white">
        <DropdownMenuLabel class="font-manrope font-extrabold">
            Moderation
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onclick={() => open = true}>
            Delete
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>

<AlertDialog open={open} onOpenChange={val => open = val}>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle class="font-manrope h1 text-center">
                Are you absolutely sure you want to delete {user.name}?
            </AlertDialogTitle>
            <AlertDialogDescription class="font-sora text-gray-600 text-center">
                This action cannot be undone. This will permanently delete {user.name}'s
                account and remove their data from the servers.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="items-center font-sora">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onclick={() => api.deleteUser(user.id)}>
                Continue
            </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
