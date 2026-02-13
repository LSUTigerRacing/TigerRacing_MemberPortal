// Allows users to select Labels for Tasks

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
import { availableTags } from "@/lib/dummyData/dummyTasks";
import { useState } from "react";

interface TagsComboboxProps {
    selectedTags: string[]
    onTagsChange: (tags: string[]) => void
}

export function TagsCombobox ({ selectedTags, onTagsChange }: TagsComboboxProps) {
    const [open, setOpen] = useState(false);

    const toggleTag = (tagValue: string) => {
        if (selectedTags.includes(tagValue)) {
            onTagsChange(selectedTags.filter(tag => tag !== tagValue));
        } else {
            onTagsChange([...selectedTags, tagValue]);
        }
    };

    const removeTag = (tagValue: string) => {
        onTagsChange(selectedTags.filter(tag => tag !== tagValue));
    };

    return (
        <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-start w-40 cursor-pointer"
                    >
                        {selectedTags.length > 0
                            ? `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`
                            : "Select tags..."}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white" align="start">
                    <Command>
                        <CommandInput placeholder="Search tags..." />
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {availableTags.map(tag => (
                                <CommandItem
                                    key={tag.value}
                                    value={tag.value}
                                    onSelect={() => toggleTag(tag.value)}
                                    className="cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedTags.includes(tag.value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                                        {tag.label}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tagValue => {
                        const tag = availableTags.find(tag => tag.value === tagValue);
                        if (!tag) return null;
                        return (
                            <Badge key={tagValue} className={`${tag.color} text-white flex items-center gap-1`}>
                                {tag.label}
                                <Button
                                    className={`${tag.color} ml-1 h-3 w-3 rounded-sm cursor-pointer hover:opacity-70`}
                                    onClick={e => {
                                        e.stopPropagation();
                                        removeTag(tagValue);
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
