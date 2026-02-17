<script lang="ts">
    import {
        Command,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandSeparator
    } from "$lib/components/ui/command";

    const { data } = $props();
</script>

<Command>
    <CommandInput
        placeholder="Filter by keyword or field"
        bind:value={data.filter}
    />
</Command>
