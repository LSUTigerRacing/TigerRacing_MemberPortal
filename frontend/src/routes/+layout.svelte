<script lang="ts">
    import Navbar from "../components/layout/Navbar.svelte";

    import "../lib/css/index.css";

    const { children } = $props();
</script>

<Navbar />
<main class="font-sans">
    {@render children()}
</main>
