// Allows users to select team members as assignees for a task

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { teamMembers } from "@/lib/dummyData/dummyTasks";

interface Props {
    selectedAssignees: string[]
    onAssigneesChange: (assignees: string[]) => void
}

export function AssigneesCombobox ({ selectedAssignees, onAssigneesChange }: Props) {
    const [open, setOpen] = useState(false);

    const toggleAssignee = (assigneeValue: string) => {
        if (selectedAssignees.includes(assigneeValue)) {
            onAssigneesChange(selectedAssignees.filter(assignee => assignee !== assigneeValue));
        } else {
            onAssigneesChange([...selectedAssignees, assigneeValue]);
        }
    };

    const removeAssignee = (assigneeValue: string) => {
        onAssigneesChange(selectedAssignees.filter(assignee => assignee !== assigneeValue));
    };

    return (
    // container for both the flex-wrap and assignee popover
        <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-start w-35 cursor-pointer"
                    >
                        {selectedAssignees.length > 0
                            ? `${selectedAssignees.length} assignee${selectedAssignees.length > 1 ? "s" : ""}`
                            : "Assign to..."}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white" align="start">
                    <Command>
                        <CommandInput placeholder="Search team members..." />
                        <CommandEmpty>No team members found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {teamMembers.map(member => (
                                <CommandItem
                                    key={member.value}
                                    value={member.value}
                                    onSelect={() => toggleAssignee(member.value)}
                                    className="cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedAssignees.includes(member.value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className={`${member.color} text-white text-xs`}>
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        {member.label}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {/* displays the different assignee badges for selection display */}
            {selectedAssignees.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedAssignees.map(assigneeValue => {
                        const member = teamMembers.find(member => member.value === assigneeValue);
                        if (!member) return null;
                        return (
                            <Badge key={assigneeValue} variant="outline" className="flex items-center gap-2 pr-1">
                                <Avatar className="h-5 w-5">
                                    <AvatarFallback className={`${member.color} text-white text-xs`}>
                                        {member.initials}
                                    </AvatarFallback>
                                </Avatar>
                                {member.label}
                                <Button
                                    className="ml-1 h-3 w-3 rounded-sm cursor-pointer hover:bg-gray-400 bg-white"
                                    onClick={e => {
                                        e.stopPropagation();
                                        removeAssignee(assigneeValue);
                                    }}
                                >
                                    <X className="h-3 w-3 text-black" />
                                </Button>
                            </Badge>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
