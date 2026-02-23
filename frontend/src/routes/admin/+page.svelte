<script lang="ts">
    import GalleryView from "$lib/components/pages/admin/GalleryView.svelte";
    import ListView from "$lib/components/pages/admin/ListView.svelte";
    import SearchBar from "$lib/components/pages/admin/SearchBar.svelte";

    import { ViewMode, SortOrder, type AdminProps } from "$lib/components/pages/admin/types";

    let viewMode = $state<ViewMode>(ViewMode.List);
    let sortOrder = $state<SortOrder>(SortOrder.Ascending);

    let filters = $state<AdminProps["filters"]>({
        systems: [],
        subsystems: [],
        years: [],
        name: ""
    });

    let users = $state.raw<AdminProps["users"]>([]);
    let activeUser = $state("");

    const nameFilter = $derived(filters.name.toLowerCase());
    const filteredUsers = $derived(
        users.filter(user => (
                (!filters.systems.length || !filters.systems.includes(user.system))
                && (!filters.subsystems.length || !filters.subsystems.includes(user.subsystem))
                && (!filters.years.length || !filters.years.includes(user.gradYear))
                && (!filters.name || user.name.toLowerCase().includes(nameFilter))
            )
        ).sort((a, b) => (
            sortOrder === SortOrder.Ascending
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        ))
    );

    const filteredCount = $derived(filteredUsers.length);
</script>

<div class="xl:mt-16.75 px-8">
    <div class="rounded-sm pt-4">
        <SearchBar
            bind:viewMode={viewMode}
            bind:sortOrder={sortOrder}
            bind:filters={filters}
            filteredCount={filteredCount}
        />

        {#if viewMode === ViewMode.Gallery}
            <GalleryView bind:viewMode={viewMode} bind:activeUser={activeUser} users={filteredUsers} />
        {:else}
            <ListView bind:activeUser={activeUser} users={filteredUsers} />
        {/if}
    </div>
</div>
