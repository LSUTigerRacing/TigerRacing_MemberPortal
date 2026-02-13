<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    const { url, text }: Record<"url" | "text", string> = $props();
</script>

<Button variant="default" class="w-60 h-16 cursor-pointer opacity-100! hover:bg-white hover:text-black active:bg-black active:text-white motion-safe:duration-300" onclick={() => window.open(url, "_self")}>{text}</Button>;
