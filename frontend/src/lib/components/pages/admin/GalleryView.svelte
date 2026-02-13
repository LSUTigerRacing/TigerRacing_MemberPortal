<script lang="ts">
    import { type AdminProps } from "./types";

    let {
        viewMode = $bindable(),
        activeUser = $bindable(),
        users
    }: Pick<AdminProps, "viewMode" | "activeUser" | "users"> = $props();
</script>
