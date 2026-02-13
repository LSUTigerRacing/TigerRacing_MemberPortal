<script lang="ts">
    import Navbar from "$lib/components/layout/Navbar.svelte";

    import "../lib/css/index.css";

    const { children } = $props();
</script>

<Navbar />
{@render children()}
