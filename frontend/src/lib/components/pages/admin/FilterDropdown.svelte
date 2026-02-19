<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Field, FieldGroup, FieldLabel } from "$lib/components/ui/field";
    import { Separator } from "$lib/components/ui/separator";

    import { SortOrder, type AdminProps } from "./types";

    import { config } from "../../../../../../shared/config/config";
    import { System } from "../../../../../../shared/config/enums";

    let {
        sortOrder = $bindable(),
        filters = $bindable(),
        filteredCount
    }: Pick<AdminProps, "sortOrder" | "filters" | "filteredCount"> = $props();

    const CURRENT_YEAR = new Date().getFullYear();

    function toggleFilter<T> (array: T[], value: T): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        array.includes(value)
            ? array.splice(array.indexOf(value), 1)
            : array.push(value);
    };
</script>

<div class="px-6 py-4 font-manrope">
    <p class="text-md mb-2">Filter by System</p>
    <div class="flex gap-3">
        {#each Object.entries(config.systems) as [system, subsystems], i (i)}
            <div class="flex flex-col gap-3">
                <Button
                    class={filters.systems.includes(system as System) ? "bg-gray-500/40 hover:bg-gray-500/60" : "hover:bg-primary/80"}
                    onclick={() => toggleFilter(filters.systems, system as System)}
                >
                    {system}
                </Button>
                <Separator />
                {#each subsystems as subsystem, i (i)}
                    <FieldGroup class="mx-auto xl:w-56">
                        <Field orientation="horizontal">
                            <Checkbox
                                id={`filter-${subsystem}`}
                                class="cursor-pointer transition-all"
                                checked={!filters.systems.includes(system as System) && !filters.subsystems.includes(subsystem)}
                                onclick={e => (e.preventDefault(), toggleFilter(filters.subsystems, subsystem))}
                            />
                            <FieldLabel
                                for={`filter-${subsystem}`}
                                class="cursor-pointer text-nowrap"
                                onclick={e => (e.preventDefault(), toggleFilter(filters.subsystems, subsystem))}
                            >
                                {subsystem}
                            </FieldLabel>
                        </Field>
                    </FieldGroup>
                {/each}
            </div>
        {/each}
    </div>
    <Separator class="mt-6" />
    <p class="text-md mt-4 mb-2">Filter by Graduation Year</p>
    <div class="flex gap-3">
        {#each { length: 4 } as _, i (i)}
            <Button onclick={() => toggleFilter(filters.years, CURRENT_YEAR + i)} class={filters.years.includes(CURRENT_YEAR + i) ? "bg-gray-500/40 hover:bg-gray-500/60" : "hover:bg-primary/80"}>{i === 3 ? `${CURRENT_YEAR + i}+` : CURRENT_YEAR + i}</Button>
        {/each}
    </div>
    <p class="text-md mt-4 mb-2">Sort Order</p>
    <Button onclick={() => sortOrder = (sortOrder === SortOrder.Ascending) ? SortOrder.Descending : SortOrder.Ascending}>
        {sortOrder === SortOrder.Ascending ? "Ascending (A-Z)" : "Descending (Z-A)"}
    </Button>

    <Separator class="my-4" />
    <div class="flex justify-between">
        <span class="text-xs text-muted-foreground">{filteredCount} results</span>
        <Button
            variant="destructive"
            onclick={() => filters = { systems: [], subsystems: [], years: [], name: "" }}
            disabled={filters.subsystems.length === 0 && filters.systems.length === 0 && filters.years.length === 0}
        >
            Reset Filters
        </Button>
    </div>
</div>
