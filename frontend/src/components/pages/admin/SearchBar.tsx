"use client";

import {
    FunnelIcon,
    GalleryHorizontalIcon,
    SearchIcon,
    TableProperties
} from "lucide-react";
import {
    useId,
    useState,
    useRef,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type ReactElement
} from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import FilterDropdown from "@/components/pages/admin/FilterDropdown";

import type { Subsystem, System } from "../../../../../shared/config/enums";

export interface SearchBarProps {
    view: "column" | "gallery"
    setView: Dispatch<SetStateAction<"column" | "gallery">>
    sortOrder: "asc" | "desc"
    setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>
    filters: {
        systems: System[]
        subsystems: Subsystem[]
        years: number[]
    }
    setFilters: Dispatch<SetStateAction<{
        systems: System[]
        subsystems: Subsystem[]
        years: number[]
    }>>
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    filteredCount: number
}

export default function SearchBar (props: SearchBarProps): ReactElement<SearchBarProps> {
    const id = useId();

    const [searchValue, setSearchValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dismiss the dropdown when clicking outside.
    // NOTE: This isn't very performant.
    useEffect(() => {
        function handleClickOutside (event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <div className="bg-background rounded-xl border-b px-4 md:px-6 **:no-underline">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex flex-1 items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon-lg"
                                variant="ghost"
                                className="text-muted-foreground rounded-full shadow-none"
                                aria-label="Open search menu"
                                onClick={e => e.preventDefault()}
                            >
                                <FunnelIcon className="scale-115" aria-hidden="true" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-w-fit" align="start">
                            <FilterDropdown
                                filters={props.filters}
                                setFilters={props.setFilters}
                                filteredCount={props.filteredCount}
                                sortOrder={props.sortOrder}
                                setSortOrder={props.setSortOrder}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="relative flex-1">
                        <Input
                            id={`input-${id}`}
                            className="peer w-full max-w-xl ps-8 pe-2"
                            placeholder="Search for members..."
                            type="search"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onFocus={() => searchValue && setIsDropdownOpen(true)}
                            autoComplete="off"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                            <SearchIcon size={16} />
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <Button size="icon" variant="ghost" className="rounded-full" aria-label="Toggle layout view" onClick={() => props.setView(props.view === "column" ? "gallery" : "column")}>
                        {props.view === "column"
                            ? <GalleryHorizontalIcon aria-hidden={true} />
                            : <TableProperties aria-hidden={true} />
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};
