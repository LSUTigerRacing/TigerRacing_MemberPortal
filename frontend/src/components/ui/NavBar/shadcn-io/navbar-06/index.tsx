"use client";

import * as React from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/shadcn-components/button";
import { CircleUserRound } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/shadcn-components/dropdown-menu";
import { Avatar } from "@/components/ui/shadcn-components/avatar";
import { cn } from "@/lib/utils";

// Logo component for the navbar
const Logo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img
            className="w-auto h-11 align-middle inline-block"
            src={logo}
            alt="Logo"
            {...props}
        />
    );
};

// User Menu Component
const UserMenu = ({
    userName = "Car McCarface",
    userEmail = "cmccarface1@lsu.edu",
    onItemClick
}: {
    userName?: string
    userEmail?: string
    onItemClick?: (item: string) => void
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="group p-0 rounded-full hover:bg-transparent text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="User menu"
            >
                <Avatar className="h-10 w-10 flex items-center justify-center rounded-full overflow-hidden bg-primary group-hover:bg-primary/80">
                    <CircleUserRound
                        className="h-10 w-10 text-background rounded group-hover:text-primary/80"
                        strokeWidth={1.2}
                        style={{ width: "90%", height: "90%" }}
                        aria-hidden="true"
                    />
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-background">
            <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("profile")}>
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("settings")}>
                Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("billing")}>
                Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("logout")}>
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

// Props interface
export interface Navbar06Props extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode
    userName?: string
    userEmail?: string
    onUserItemClick?: (item: string) => void
    onMenuClick?: () => void
}

export const Navbar06 = React.forwardRef<HTMLElement, Navbar06Props>(
    (
        {
            className,
            logo = <Logo />,
            userName = "Car McCarface",
            userEmail = "cmccarface1@lsu.edu",
            onUserItemClick,
            onMenuClick,
            ...props
        },
        ref
    ) => {
        return (
            <header
                ref={ref}
                className={cn(
                    "sticky top-0 z-50 w-full border-b border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
                    className
                )}
                {...props}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a
                            href="/"
                            className="flex items-center text-primary hover:text-primary/90 transition-colors"
                            aria-label="Go to homepage"
                        >
                            {logo}
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            className="px-3 py-2 font-sora rounded-full bg-primary hover:bg-primary/80 text-white focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Open menu"
                            onClick={onMenuClick}
                        >
                            Menu
                        </Button>

                        <UserMenu
                            userName={userName}
                            userEmail={userEmail}
                            onItemClick={onUserItemClick}
                        />
                    </div>
                </div>
            </header>
        );
    }
);

Navbar06.displayName = "Navbar06";

export { Logo, UserMenu };
