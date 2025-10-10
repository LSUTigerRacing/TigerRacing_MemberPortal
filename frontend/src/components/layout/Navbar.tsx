"use client";

import {
    forwardRef,
    useEffect,
    useState,
    useRef,
    type HTMLAttributes,
    type ImgHTMLAttributes,
    type ReactElement,
    useCallback,
    type ReactNode
} from "react";
import {
    BellIcon,
    ChevronDownIcon,
    FileText,
    Gauge,
    GraduationCap,
    LogOut,
    Mail,
    Settings,
    TrendingUp,
    User
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import LogoImg from "@/assets/img/logos/logo.png";

interface NavbarItem {
    title: string
    href?: string
}

interface NavbarProps extends HTMLAttributes<HTMLElement> {
    logo?: ReactNode
    logoHref?: string
    navigationLinks?: NavbarItem[]
    userName?: string
    userEmail?: string
    userAvatar?: string
    notificationCount?: number
    onNavItemClick?: (href: string) => void
    onNotificationItemClick?: (item: string) => void
    onUserItemClick?: (item: string) => void
}

const NavigationLinks: NavbarItem[] = [
    { title: "Formula LSU", href: "https://formulalsu.com" }
];

/**
 * Navbar logo.
 */
const Logo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img
            className="w-auto h-11 align-middle inline-block"
            src={LogoImg}
            alt="Logo"
            {...props}
        />
    );
};

const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
    <svg
        className={cn("pointer-events-none", className)}
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
    </svg>
);

const NotificationMenu = ({
    notificationCount = 3,
    onItemClick
}: {
    notificationCount?: number
    onItemClick?: (item: string) => void
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <BellIcon className="h-4 w-4" />
                {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {notificationCount > 9 ? "9+" : notificationCount}
                    </Badge>
                )}
                <span className="sr-only">Notifications</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("notification1")}>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">New message received</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("notification2")}>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">System update available</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("notification3")}>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Weekly report ready</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("view-all")}>
                View all notifications
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const UserMenu = ({
    userName = "Car McCarface",
    userEmail = "cmccarface1@lsu.edu",
    userAvatar,
    onItemClick
}: {
    userName?: string
    userEmail?: string
    userAvatar?: string
    onItemClick?: (item: string) => void
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground">
                <Avatar className="h-7 w-7">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="text-xs">
                        {userName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                </Avatar>
                <ChevronDownIcon className="h-3 w-3 ml-1" />
                <span className="sr-only">User menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("dashboard")}>
                <Gauge />
                Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("profile")}>
                <User />
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("inbox")}>
                <Mail />
                Inbox
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("financials")}>
                <TrendingUp />
                Financials
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("settings")}>
                <Settings />
                Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("training")}>
                <GraduationCap />
                Training
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("documentation")}>
                <FileText />
                Documentation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("logout")}>
                <LogOut />
                Sign out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const NavbarComponent = forwardRef<HTMLElement, NavbarProps>(
    (
        {
            className,
            logo = <Logo />,
            logoHref = "/",
            navigationLinks = NavigationLinks,
            userName = "Car McCarface",
            userEmail = "cmccar1@lsu.edu",
            userAvatar,
            notificationCount = 3,
            onNavItemClick = (href: string) => window.open(href, "_blank"),
            onNotificationItemClick,
            onUserItemClick = (href: string) => window.open(href, "_self"),
            ...props
        },
        ref
    ) => {
        const [isMobile, setIsMobile] = useState(false);
        const containerRef = useRef<HTMLElement>(null);
        useEffect(() => {
            const checkWidth = () => {
                if (containerRef.current) {
                    const width = containerRef.current.offsetWidth;
                    setIsMobile(width < 768); // 768px is md breakpoint
                }
            };
            checkWidth();
            const resizeObserver = new ResizeObserver(checkWidth);
            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }
            return () => {
                resizeObserver.disconnect();
            };
        }, []);
        // Combine refs
        const combinedRef = useCallback((node: HTMLElement | null) => {
            containerRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        }, [ref]);
        return (
            <header
                ref={combinedRef}
                className={cn(
                    "top-0 z-50 w-full border-b bg-background/95 supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
                    className
                )}
                {...props}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {isMobile && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <HamburgerIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-64 p-1">
                                    <NavigationMenu className="max-w-none">
                                        <NavigationMenuList className="flex-col items-start gap-0">
                                            {navigationLinks.map((link, index) => (
                                                <NavigationMenuItem key={index} className="w-full">
                                                    <button
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            if (onNavItemClick && link.href) onNavItemClick(link.href);
                                                        }}
                                                        className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                                                    >
                                                        {link.title}
                                                    </button>
                                                </NavigationMenuItem>
                                            ))}
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </PopoverContent>
                            </Popover>
                        )}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={(() => window.open(logoHref, "_self"))}
                                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                            >
                                <div className="text-2xl">
                                    {logo}
                                </div>
                            </button>
                            {!isMobile && (
                                <NavigationMenu className="flex">
                                    <NavigationMenuList className="gap-1">
                                        {navigationLinks.map((link, index) => (
                                            <NavigationMenuItem key={index}>
                                                <NavigationMenuLink
                                                    href={link.href}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        if (onNavItemClick && link.href) onNavItemClick(link.href);
                                                    }}
                                                    className="text-muted-foreground hover:text-primary font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    {link.title}
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        ))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <NotificationMenu
                                notificationCount={notificationCount}
                                onItemClick={onNotificationItemClick}
                            />
                        </div>
                        <UserMenu
                            userName={userName}
                            userEmail={userEmail}
                            userAvatar={userAvatar}
                            onItemClick={onUserItemClick}
                        />
                    </div>
                </div>
            </header>
        );
    }
);

export default function Navbar (): ReactElement {
    return (
        <div className="relative w-full">
            <NavbarComponent />
        </div>
    );
};
