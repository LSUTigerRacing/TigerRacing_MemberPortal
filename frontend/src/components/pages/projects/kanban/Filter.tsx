// Filter Command Bar for the KanbanBoard
// Allows for multiselection filtering

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check, Tag, User, ListFilter, Calendar, Hash, X } from "lucide-react";
import type { Column, Task } from "./KanbanBoard";
import { useState, useMemo } from "react";
import { Button } from "../../../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
    columns: Column[]
    tasks: Task[]
    filters: {
        statuses: string[]
        assignees: string[]
        priorities: string[]
        labels: string[]
        startDates: string[]
        endDates: string[]
    }
    updateFilters: (key: keyof Props["filters"], value: string[]) => void
}

export function FilterCommandBar ({ columns, tasks, filters, updateFilters }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const toggleFilter = (filterKey: keyof Props["filters"], filterValue: string) => {
        const currentFilterList = filters[filterKey];
        if (currentFilterList.includes(filterValue)) {
            updateFilters(
                filterKey,
                currentFilterList.filter(value => value !== filterValue)
            );
        } else {
            updateFilters(filterKey, [...currentFilterList, filterValue]);
        }
    };

    const clearAllFilters = () => {
        updateFilters("statuses", []);
        updateFilters("assignees", []);
        updateFilters("priorities", []);
        updateFilters("labels", []);
        updateFilters("startDates", []);
        updateFilters("endDates", []);
        setInputValue("");
    };

    const uniqueAssignees = Array.from(new Set(tasks.flatMap(task => task.assignees || [])));
    const uniqueLabels = Array.from(new Set(tasks.flatMap(task => task.tags || [])));

    const uniqueStartDates = Array.from(
        new Set(
            tasks
                .filter(task => task.startDate)
                .map(task =>
                    new Date(task.startDate!).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric"
                    })
                )
        )
    );

    const uniqueEndDates = Array.from(
        new Set(
            tasks
                .filter(task => task.endDate)
                .map(task =>
                    new Date(task.endDate!).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric"
                    })
                )
        )
    );

    const getFilterDisplayName = (filterKey: keyof Props["filters"], value: string) => {
        switch (filterKey) {
            case "statuses":
                return columns.find(col => String(col.id) === value)?.title || value;
            case "assignees":
            case "labels":
            case "startDates":
            case "endDates":
                return value;
            case "priorities":
                return value;
            default:
                return value;
        }
    };

    const activeFilterTokens = [
        ...filters.statuses.map(value => ({
            key: "statuses" as const,
            value,
            display: `status:${getFilterDisplayName("statuses", value)}`
        })),
        ...filters.assignees.map(value => ({
            key: "assignees" as const,
            value,
            display: `assignee:${value}`
        })),
        ...filters.priorities.map(value => ({
            key: "priorities" as const,
            value,
            display: `priority:${value.toLowerCase()}`
        })),
        ...filters.labels.map(value => ({
            key: "labels" as const,
            value,
            display: `label:${value}`
        })),
        ...filters.startDates.map(value => ({
            key: "startDates" as const,
            value,
            display: `start:${value}`
        })),
        ...filters.endDates.map(value => ({
            key: "endDates" as const,
            value,
            display: `due:${value}`
        }))
    ];

    const parsedInput = useMemo(() => {
        const trimmedInput = inputValue.trim().toLowerCase();

        if (!trimmedInput) {
            return { type: "all", query: "", showGroupSuggestions: true };
        }

        if (trimmedInput.includes(":")) {
            const [prefix, query] = trimmedInput.split(":");
            return {
                type: prefix,
                query: query || "",
                showGroupSuggestions: !query
            };
        }
        return { type: "search", query: trimmedInput, showGroupSuggestions: true };
    }, [inputValue]);

    const filterPrefixes = [
        { value: "status:", label: "Status", icon: Tag, description: "Filter by task status" },
        { value: "assignee:", label: "Assignee", icon: User, description: "Filter by assignee" },
        { value: "priority:", label: "Priority", icon: Tag, description: "Filter by priority level" },
        { value: "label:", label: "Label", icon: Hash, description: "Filter by label" },
        { value: "start:", label: "Start Date", icon: Calendar, description: "Filter by start date" },
        { value: "due:", label: "Due Date", icon: Calendar, description: "Filter by due date" }
    ];

    const filteredGroupSuggestions = useMemo(() => {
        const { query } = parsedInput;
        if (!query) return filterPrefixes;
        return filterPrefixes.filter(
            prefix =>
                prefix.value.toLowerCase().includes(query) || prefix.label.toLowerCase().includes(query)
        );
    }, [parsedInput]);

    const filteredSuggestions = useMemo(() => {
        const { type, query } = parsedInput;

        const suggestions = {
            statuses: columns.filter(col =>
                type === "all" || type === "status" || type === "search"
                    ? col.title.toLowerCase().includes(query)
                    : false
            ),
            assignees: uniqueAssignees.filter(assignee =>
                type === "all" || type === "assignee" || type === "search"
                    ? assignee.toLowerCase().includes(query)
                    : false
            ),
            priorities: (["High", "Medium", "Low"] as const).filter(priority =>
                type === "all" || type === "priority" || type === "search"
                    ? priority.toLowerCase().includes(query)
                    : false
            ),
            labels: uniqueLabels.filter(label =>
                type === "all" || type === "label" || type === "search"
                    ? label.toLowerCase().includes(query)
                    : false
            ),
            startDates: uniqueStartDates.filter(date =>
                type === "all" || type === "start" || type === "search"
                    ? date.toLowerCase().includes(query)
                    : false
            ),
            endDates: uniqueEndDates.filter(date =>
                type === "all" || type === "due" || type === "search"
                    ? date.toLowerCase().includes(query)
                    : false
            )
        };
        return suggestions;
    }, [parsedInput, columns, uniqueAssignees, uniqueLabels, uniqueStartDates, uniqueEndDates]);

    const handleSelectSuggestion = (filterKey: keyof Props["filters"], value: string) => {
        toggleFilter(filterKey, value);
        setInputValue("");
    };

    const handleSelectPrefix = (prefix: string) => {
        setInputValue(prefix);
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-3">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div className="border rounded-xl bg-white px-3 py-2 flex items-center gap-2 cursor-pointer shadow-sm w-full min-h-[40px]">
                            <ListFilter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            {activeFilterTokens.length > 0
                                ? (
                                    <div className="flex flex-wrap gap-2 flex-1">
                                        {activeFilterTokens.map(({ key, value, display }) => (
                                            <Badge
                                                key={`${key}-${value}`}
                                                variant="secondary"
                                                className="flex items-center gap-1 px-2 py-0.5 text-xs"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {display}
                                                <Button
                                                    className="h-3 w-3 cursor-pointer hover:bg-red-500"
                                                    variant="secondary"
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        toggleFilter(key, value);
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                )
                                : (
                                    <span className="text-muted-foreground">Filter tasks…</span>
                                )}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className="p-0 bg-white border shadow-lg"
                        style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                        <Command shouldFilter={false}>
                            <CommandInput
                                placeholder="Type to filter... e.g. status:backlog, assignee:ricky"
                                value={inputValue}
                                onValueChange={setInputValue}
                            />
                            <CommandList className="max-h-[400px] overflow-y-auto">
                                <CommandEmpty>No results found.</CommandEmpty>
                                {parsedInput.showGroupSuggestions && filteredGroupSuggestions.length > 0 && (
                                    <CommandGroup heading="Filter Types">
                                        {filteredGroupSuggestions.map(prefix => (
                                            <CommandItem
                                                key={prefix.value}
                                                onSelect={() => handleSelectPrefix(prefix.value)}
                                                className="flex items-center gap-2"
                                            >
                                                <prefix.icon className="w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{prefix.label}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {prefix.description}
                                                    </span>
                                                </div>
                                                <span className="ml-auto text-xs text-muted-foreground font-mono">
                                                    {prefix.value}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {filteredSuggestions.statuses.length > 0 && parsedInput.type === "status" && (
                                    <CommandGroup heading="Status">
                                        {filteredSuggestions.statuses.map(column => (
                                            <CommandItem
                                                key={column.id}
                                                onSelect={() => handleSelectSuggestion("statuses", String(column.id))}
                                                className="flex items-center gap-2"
                                            >
                                                {filters.statuses.includes(String(column.id))
                                                    ? (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )
                                                    : (
                                                        <span className="w-4 h-4" />
                                                    )}
                                                <div className={cn("w-2 h-2 rounded-full", column.color)} />
                                                <span>{column.title}</span>
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    status:{column.title.toLowerCase()}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {filteredSuggestions.assignees.length > 0 && parsedInput.type === "assignee" && (
                                    <CommandGroup heading="Assignees">
                                        {filteredSuggestions.assignees.map(assigneeName => (
                                            <CommandItem
                                                key={assigneeName}
                                                onSelect={() => handleSelectSuggestion("assignees", assigneeName)}
                                                className="flex items-center gap-2"
                                            >
                                                {filters.assignees.includes(assigneeName)
                                                    ? (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )
                                                    : (
                                                        <span className="w-4 h-4" />
                                                    )}
                                                <User className="w-4 h-4" />
                                                <span>{assigneeName}</span>
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    assignee:{assigneeName}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {filteredSuggestions.priorities.length > 0 && parsedInput.type === "priority" && (
                                    <CommandGroup heading="Priority">
                                        {filteredSuggestions.priorities.map(priorityLevel => (
                                            <CommandItem
                                                key={priorityLevel}
                                                onSelect={() => handleSelectSuggestion("priorities", priorityLevel)}
                                                className="flex items-center gap-2"
                                            >
                                                {filters.priorities.includes(priorityLevel)
                                                    ? (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )
                                                    : (
                                                        <span className="w-4 h-4" />
                                                    )}
                                                <Tag className="w-4 h-4" />
                                                <span>{priorityLevel}</span>
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    priority:{priorityLevel.toLowerCase()}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {filteredSuggestions.labels.length > 0 && parsedInput.type === "label" && (
                                    <CommandGroup heading="Labels">
                                        {filteredSuggestions.labels.map(labelName => (
                                            <CommandItem
                                                key={labelName}
                                                onSelect={() => handleSelectSuggestion("labels", labelName)}
                                                className="flex items-center gap-2"
                                            >
                                                {filters.labels.includes(labelName)
                                                    ? (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )
                                                    : (
                                                        <span className="w-4 h-4" />
                                                    )}
                                                <Hash className="w-4 h-4" />
                                                <span>{labelName}</span>
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    label:{labelName}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {filteredSuggestions.startDates.length > 0 && parsedInput.type === "start" && (
                                    <CommandGroup heading="Start Dates">
                                        {filteredSuggestions.startDates.map(startDate => (
                                            <CommandItem
                                                key={startDate}
                                                onSelect={() => handleSelectSuggestion("startDates", startDate)}
                                                className="flex items-center gap-2"
                                            >
                                                {filters.startDates.includes(startDate)
                                                    ? (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )
                                                    : (
                                                        <span className="w-4 h-4" />
                                                    )}
                                                <Calendar className="w-4 h-4" />
                                                <span>{startDate}</span>
                                                <span className="ml-auto text-xs text-muted-foreground">
                                                    start:{startDate}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                                {filteredSuggestions.endDates.length > 0 && parsedInput.type === "due" && (
                                    <CommandGroup heading="Due Dates">
                                        {filteredSuggestions.endDates.map(dueDate => (
                                            <CommandItem
                                                key={dueDate}
                                                onSelect={() => handleSelectSuggestion("endDates", dueDate)}
                                                className="flex items-center gap-2"
                                            >
                                                {filters.endDates.includes(dueDate)
                                                    ? (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )
                                                    : (
                                                        <span className="w-4 h-4" />
                                                    )}
                                                <Calendar className="w-4 h-4" />
                                                <span>{dueDate}</span>
                                                <span className="ml-auto text-xs text-muted-foreground">due:{dueDate}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {activeFilterTokens.length > 0 && (
                    <Button variant="outline" onClick={clearAllFilters} className="h-full bg-white border">
                        Clear All
                    </Button>
                )}
            </div>
        </div>
    );
}
