"use client";

import {
    useEffect,
    useId,
    useRef,
    useState,
    type ChangeEvent,
    type Dispatch,
    type HTMLAttributes,
    type ReactElement,
    type SetStateAction
} from "react";
import {
    FunnelIcon,
    GalleryHorizontalIcon,
    SearchIcon,
    TableProperties
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import FilterDropdown from "./FilterDropdown";

import {
    type User,
    type Subsystem,
    type System
} from "@/lib/dummyData/user";

export interface SearchBarProps extends HTMLAttributes<HTMLElement> {
    view: "column" | "gallery"
    sortOrder: "asc" | "desc"
    setView: Dispatch<SetStateAction<SearchBarProps["view"]>>
    setSortOrder: Dispatch<SetStateAction<SearchBarProps["sortOrder"]>>
    onFilterChange: (filteredMembers: User[]) => void
    onSearchChange: (filteredMembers: User[]) => void
    onDropdownSelect: (memberId: string) => void
}

export default function SearchBar (props: SearchBarProps): ReactElement<SearchBarProps> {
    const id = useId();

    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchValue(value);
        setUsers(users);

        const filtered = users.filter(user => user.Name.toLowerCase().includes(value.toLowerCase()));
        props.onSearchChange(filtered);

        if (value.length > 0) setIsDropdownOpen(true);
    };

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

    const [filteredCount, setFilteredCount] = useState(0);
    const [filters, setFilters] = useState<{ systems: System[], subsystems: Subsystem[], years: string[] }>({
        systems: [],
        subsystems: [],
        years: []
    });

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
                                filters={filters}
                                setFilters={setFilters}
                                filteredCount={filteredCount}
                                setFilteredCount={setFilteredCount}
                                sortOrder={props.sortOrder}
                                setSortOrder={props.setSortOrder}
                                onFilterChange={props.onFilterChange}
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
                            onChange={handleSearch}
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
}
