import React, { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { User } from "@/components/dummyData/user";

interface DropdownMenuProps {
    user: User
    onDeleteMember: (userId: string) => void
}

export default function DropdownMenuDemo ({ user, onDeleteMember }: DropdownMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Dropdown for Ellipses */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel className="font-manrope font-extrabold">
                        Moderate Member
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        Kick/Ban
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog For Kicking Member */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-manrope h1 text-center">
                            Are you absolutely sure you want to delete {user.Name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="font-sora text-gray-600 text-center">
                            This action cannot be undone. This will permanently delete {user.Name}'s
                            account and remove their data from the servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="items-center font-sora">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDeleteMember(user.UserId)}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
