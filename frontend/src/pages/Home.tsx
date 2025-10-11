import { Button } from "@/components/ui/button";

import HeroBg from "@/assets/img/backgrounds/hero_bg.png";
import Logo from "@/assets/img/logos/logo_white.png";

/**
 * Creates a splash button with the given display text and URL.
 */
const SplashButton = (props: { text: string, url: string }) => <Button variant="default" className="w-60 h-16 !opacity-100 hover:bg-accent hover:text-black active:bg-black active:text-white motion-safe:duration-300" asChild><a href={props.url}>{props.text}</a></Button>;

export const Home = () => {
    return (
        <>
            <div className="fixed w-screen h-screen overflow-hidden bg-cover" style={{ backgroundImage: `url(${HeroBg})` }}></div>
            <div className="fixed bg-[#00000060] backdrop-blur-xs w-screen h-screen"></div>

            <div className="fixed flex flex-col justify-center items-center w-screen h-screen">
                <img src={Logo} alt="TigerRacing logo" className="size-max mb-10 px-10" />
                <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                    {/* TODO: Change these redirects. */}
                    <SplashButton text="Member Management" url="/login?redirect_to=/dashboard" />
                    <SplashButton text="Financials" url="/login?redirect_to=/dashboard" />
                    <SplashButton text="Gantt Chart" url="/login?redirect_to=/dashboard" />
                </div>
            </div>

        </>
    );
};
