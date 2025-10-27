import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface dropdownMenuProps {
  onModerate: () => void;
}

export default function DropdownMenuDemo({ onModerate }: dropdownMenuProps) {
  return (
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
        <DropdownMenuItem onClick={onModerate}>
          Kick/Ban
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
