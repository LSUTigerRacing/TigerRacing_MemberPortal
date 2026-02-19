<script lang="ts">
    import type { IconProps } from "@lucide/svelte";
    import type { Component } from "svelte";

    import { Button } from "$lib/components/ui/button";

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    const { title, icon, url }: { title: string, icon: Component<IconProps, {}, "">, url: string } = $props();
</script>

<Button variant="ghost" class="justify-start hover:bg-primary hover:text-secondary" onclick={() => window.open(url, "_self")}>
    {@const Icon = icon}
    <Icon />
    {title}
</Button>
