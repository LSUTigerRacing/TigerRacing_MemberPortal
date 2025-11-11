import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { LucideChevronDown } from "lucide-react";

interface FilterDropDownProps {
    onValueChange: (value: string) => void
    selectedValue: string | null
}

export function FilterDropDown ({ onValueChange, selectedValue }: FilterDropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                <Button variant="ghost" className="">
                    {selectedValue}
                    <LucideChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-45 bg-white" align="start">
                <DropdownMenuLabel>Slice by</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={selectedValue || ""} onValueChange={onValueChange}>
                    <DropdownMenuRadioItem value="Overall">Overall</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Assignee">Assignee</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Status">Status</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Priority">Priority</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Start Date">Start Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="End Date">End Date</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
