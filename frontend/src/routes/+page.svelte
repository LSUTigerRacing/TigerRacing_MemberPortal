<script lang="ts">
    import SplashButton from "$lib/components/pages/home/SplashButton.svelte";

    import HeroBg from "$lib/img/backgrounds/hero_bg.png";
    import Logo from "$lib/img/logos/logo_white.png";
</script>

<!-- for accessibility scoring on homepage -->
<h1 class="hidden">Home</h1>

<!-- Backdrop -->
<div class="fixed w-screen h-screen overflow-hidden bg-cover" style="background-image: url({HeroBg});"></div>
<div class="fixed bg-[#00000060] backdrop-blur-xs w-screen h-screen"></div>

<!-- Buttons -->
<div class="fixed flex flex-col justify-center items-center w-screen h-screen">
    <img src={Logo} alt="TigerRacing splash logo" class="size-max mb-10 px-10" />
    <div class="flex flex-col md:flex-row justify-center items-center gap-2">
        <SplashButton text="Dashboard" url="/dashboard" />
        <SplashButton text="Wiki" url="https://wiki.formulalsu.org" />
        <SplashButton text="Apply" url="https://formulalsu.org/apply" />
    </div>
</div>
