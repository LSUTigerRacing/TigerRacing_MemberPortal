// MyTaskContent Filter Dropdown component
// Handles different selections for filtering

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { LucideChevronDown } from "lucide-react";

interface FilterDropDownProps {
  onValueChange: (value: string) => void;
  selectedValue: string | null;
}

export function FilterDropDown({ onValueChange, selectedValue }: FilterDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-white cursor-pointer">
        <Button variant="ghost" className="">
          {selectedValue}
          <LucideChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45 bg-white" align="start">
        <DropdownMenuLabel>Slice by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={selectedValue || ""} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="Status" className="cursor-pointer">
            Status
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Assignee" className="cursor-pointer">
            Assignee
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Priority" className="cursor-pointer">
            Priority
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Start Date" className="cursor-pointer">
            Start Date
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="End Date" className="cursor-pointer">
            End Date
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Label" className="cursor-pointer">
            Label
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
