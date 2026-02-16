<script lang="ts">
    import { page } from "$app/state";

    import Navbar from "$lib/components/layout/Navbar.svelte";

    import "../lib/css/index.css";

    const { children } = $props();
</script>

{#if page.url.pathname !== "/login"}
    <Navbar />
{/if}
{@render children()}
