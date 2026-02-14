<script lang="ts">
    import {
        FunnelIcon,
        GalleryHorizontalIcon,
        SearchIcon,
        TableProperties
    } from "@lucide/svelte";

    import { Button } from "$lib/components/ui/button";
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "$lib/components/ui/dropdown-menu";
    import { Input } from "$lib/components/ui/input";

    import FilterDropdown from "./FilterDropdown.svelte";
    import { ViewMode, type AdminProps } from "./types";

    let {
        viewMode = $bindable(),
        sortOrder = $bindable(),
        filters = $bindable(),
        filteredCount
    }: Pick<AdminProps, "viewMode" | "filters" | "sortOrder" | "filteredCount"> = $props();

</script>

<div class="bg-background rounded-xl border-b px-4 md:px-6 **:no-underline">
    <div class="flex h-16 items-center justify-between gap-4">
        <!-- Left side -->
        <div class="flex flex-1 items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {#snippet child({ props })}
                        <Button
                            {...props}
                            size="icon-lg"
                            variant="ghost"
                            class="text-muted-foreground rounded-full shadow-none"
                            aria-label="Open search menu"
                            onclick={e => e.preventDefault()}
                        >
                            <FunnelIcon class="scale-115" aria-hidden="true" />
                        </Button>
                    {/snippet}
                </DropdownMenuTrigger>
                <DropdownMenuContent class="max-w-fit" align="start">
                    <FilterDropdown
                        bind:sortOrder={sortOrder}
                        bind:filters={filters}
                        filteredCount={filteredCount}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <div class="relative flex-1">
                <Input
                    id="admin-search-name"
                    class="peer w-full max-w-xl ps-8 pe-2"
                    placeholder="Search for members..."
                    type="search"
                    autocomplete="off"
                    bind:value={filters.name}
                />
                <div class="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                    <SearchIcon size={16} />
                </div>
            </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
            <Button size="icon" variant="ghost" class="rounded-full" aria-label="Toggle layout view" onclick={() => viewMode = viewMode === ViewMode.Gallery ? ViewMode.List : ViewMode.Gallery}>
                {#if viewMode === ViewMode.Gallery}
                    <GalleryHorizontalIcon />
                {:else}
                    <TableProperties />
                {/if}
            </Button>
        </div>
    </div>
</div>
