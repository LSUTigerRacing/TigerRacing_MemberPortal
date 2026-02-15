<script lang="ts">
    import { resolve } from "$app/paths";

    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import Separator from "$lib/components/ui/separator/separator.svelte";

    import LoginBg from "$lib/img/backgrounds/login.png";

    const data = $state({
        email: "",
        password: ""
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function logIn (): void {}
</script>

<div id="login-container" class="w-dvw xl:h-dvh!">
    <div class="w-full h-full font-manrope grid grid-cols-4">
        <div class="bg-[#37005c] text-background shadow-2xl col-span-4 lg:col-span-2 2xl:col-span-1">
            <div class="p-4 flex flex-col justify-center items-center h-full">
                <div class="w-full flex flex-col gap-4 xl:mt-18.75">
                    <h1 class="text-4xl text-center font-black">Log In</h1>
                    <!-- TODO: Incorporate shadcn-svelte Field as opposed to using regular Input / Label components -->
                    <form class="flex flex-col gap-4" onsubmit={e => (e.preventDefault(), logIn())}>
                        <Label for="login-email" class="font-sora">Email</Label>
                        <Input
                            class="login-input bg-primary border-primary"
                            name="login-email"
                            type="email"
                            placeholder="Enter your email"
                            autocomplete="email"
                            required
                            disabled
                            bind:value={data.email}
                        />
                        <div class="flex justify-between">
                            <Label for="login-password" class="font-sora">Password</Label>
                            <a class="text-xs hover:text-secondary" href={resolve("/forgot-password", {})}>Forgot your password?</a>
                        </div>
                        <Input
                            class="login-input bg-primary border-primary"
                            name="login-password"
                            type="password"
                            placeholder="Enter your password"
                            autocomplete="current-password"
                            required
                            disabled
                            bind:value={data.password}
                        />
                        <Button type="submit" variant="secondary" disabled={!data.email || !data.password}>Log In</Button>
                    </form>
                    <Separator class="bg-muted/40" />
                    <!-- TODO: Make this button look more appealing. -->
                    <a class={buttonVariants()} href={resolve("/api/auth/microsoft", {})}>Log In with Microsoft</a>
                    <span class="text-xs text-muted text-center">
                        Don't have an account?
                        <a class="text-xs hover:text-secondary font-black" href="https://formulalsu.org/join">Apply now!</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="hidden h-full bg-no-repeat bg-cover lg:block col-span-2 2xl:col-span-3" style="background-image: url({LoginBg});">
            <div class="w-full h-full bg-[#00000080] backdrop-blur-sm"></div>
        </div>
    </div>
</div>

<style>
    #login-container {
        height: calc(100dvh - 67px);
    }
</style>
