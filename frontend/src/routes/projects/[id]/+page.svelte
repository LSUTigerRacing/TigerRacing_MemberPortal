<script lang="ts">
    import { page } from "$app/state";

    import {
        Tabs,
        TabsContent,
        TabsList,
        TabsTrigger
    } from "$lib/components/ui/tabs";

    import Filter from "$lib/components/pages/projects/kanban/Filter.svelte";
    import MyTasks from "$lib/components/pages/projects/kanban/MyTasks.svelte";
    import KanbanBoard from "$lib/components/pages/projects/kanban/KanbanBoard.svelte";
    import { KanbanTabs } from "$lib/components/pages/projects/kanban/helpers";

    const data = $state({
        title: "MP - General",
        tab: KanbanTabs.MyTasks,
        filter: ""
    });
</script>
<div class="xl:mt-16.75 px-8 pt-4">
    <h1 class="text-2xl">{data.title}</h1>
    <Tabs value={data.tab}>
        <TabsList>
            {#each Object.values(KanbanTabs) as value, i (i)}
                <TabsTrigger value={value}>{value}</TabsTrigger>
            {/each}
        </TabsList>
        <TabsContent value={KanbanTabs.Overview}>
            <Filter {data} />
            <KanbanBoard />
        </TabsContent>
        <TabsContent value={KanbanTabs.MyTasks}>
            <Filter {data} />
            <MyTasks />
        </TabsContent>
    </Tabs>
</div>
