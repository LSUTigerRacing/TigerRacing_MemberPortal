<script lang="ts">
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import { resolve } from "$app/paths";

    import { buttonVariants } from "$lib/components/ui/button";

    import Logo from "$lib/img/logos/logo_white.webp";
    import LoginBg from "$lib/img/backgrounds/login.webp";
    import { supabase } from "$lib/supabase";

    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        if (error) {
            console.error('Error signing in with Google:', error);
        }
    }
</script>

<div id="login-container" class="w-dvw h-dvh">
    <div class="w-full h-full font-manrope grid grid-cols-4">
        <div class="bg-[#37005c] text-background shadow-2xl col-span-4 lg:col-span-2 2xl:col-span-1">
            <div class="px-8 py-8 flex flex-col justify-between h-full">
                <div class="flex flex-col justify-around items-center mt-30">
                    <div class="flex flex-col gap-6">
                        <img src={Logo} alt="TigerRacing logo" />
                        <button class="{buttonVariants({ variant: "ghost" })} bg-background text-muted-foreground font-black! text-2xl! p-8! hover:bg-primary hover:text-background active:bg-foreground active:scale-95" on:click={signInWithGoogle}>
                            Sign in with Google
                        </button>
                        <span class="text-sm text-muted text-center">
                            Don't have an account?
                            <a class="text-sm font-black transition-colors hover:text-secondary" href="https://formulalsu.org/join">Apply now!</a>
                        </span>
                    </div>
                </div>
                <div>
                    <a class="flex items-center gap-2 font-semibold font-sora transition-colors hover:text-secondary" href={resolve("/", {})}>
                        <div class="rounded-full bg-background p-1 transition-colors">
                            <ChevronLeft color="var(--primary)" size={32} />
                        </div>
                        Return to Homepage
                    </a>
                </div>
            </div>
        </div>
        <div class="hidden h-full bg-no-repeat bg-cover lg:block col-span-2 2xl:col-span-3" style="background-image: url({LoginBg});">
            <div class="w-full h-full bg-[#00000080]"></div>
        </div>
    </div>
</div>

<style>
    a:hover > div {
        background-color: var(--secondary);
    }
</style>
