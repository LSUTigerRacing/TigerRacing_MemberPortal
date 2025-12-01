"use client";

import {
    forwardRef,
    useId,
    useState,
    useRef,
    useEffect,
    type ChangeEvent,
    type Dispatch,
    type HTMLAttributes,
    type SetStateAction
} from "react";

import { TableProperties, FunnelIcon, SearchIcon, GalleryHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import FilterDropdown from "@/components/pages/admin/FilterDropdown";

import {
    type User,
    type Subsystem,
    type System
} from "@/lib/member-data-format/user";

export interface SearchBarProps extends HTMLAttributes<HTMLElement> {
    users: User[]
    view: "column" | "gallery"
    setView: Dispatch<SetStateAction<"column" | "gallery">>
    sortOrder: "asc" | "desc"
    setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>
    filters: {
        systems: System[]
        subsystems: Subsystem[]
        years: string[]
    }
    setFilters: Dispatch<SetStateAction<{
        systems: System[]
        subsystems: Subsystem[]
        years: string[]
    }>>
    filteredCount: number
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    onDropdownSelect: (memberId: string) => void
    searchPlaceholder?: string
}
export const SearchBar = forwardRef<HTMLElement, SearchBarProps>(
    (
        {
            className,
            users,
            view,
            setView,
            sortOrder,
            setSortOrder,
            filters,
            setFilters,
            filteredCount,
            searchValue,
            setSearchValue,
            onDropdownSelect,
            searchPlaceholder = "Search for members...",
            ...props
        },
        ref
    ) => {
        const id = useId();

        // Search and filtering state
        const [filteredItems, setFilteredItems] = useState<User[]>([]);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setSearchValue(value);

            const filtered = users.filter(User =>
                User.Name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
            if (value.length > 0) setIsDropdownOpen(true);
        };

        // Use effects for clicking outside
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
            <header
                ref={ref}
                className={cn("px-4 md:px-6 [&_*]:no-underline", className)}
                {...props}
            >
                <div className="flex h-16 items-center justify-between gap-4 pt-2">
                    {/* Left side: Filter button + input */}
                    <div className="flex items-center gap-2 flex-1 z-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-muted-foreground h-10 w-10 rounded-full shadow-none"
                                    aria-label="Open search menu"
                                    onClick={e => e.preventDefault()}
                                >
                                    <FunnelIcon className="scale-115" aria-hidden="true" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-w-fit" align="start">
                                <FilterDropdown
                                    filters={filters}
                                    users={users}
                                    setFilters={setFilters}
                                    filteredCount={filteredCount}
                                    sortOrder={sortOrder}
                                    setSortOrder={setSortOrder}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Input and Search */}
                        <div className="relative flex-1 max-w-lg" ref={dropdownRef}>
                            <Input
                                id={`input-${id}`}
                                className="peer h-12 w-full pl-8 pr-2 text-lg placeholder:text-base md:placeholder:text-lg"
                                placeholder={searchPlaceholder}
                                type="search"
                                value={searchValue}
                                onChange={handleSearch}
                                onFocus={() => searchValue && setIsDropdownOpen(true)}
                                autoComplete="off"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-muted-foreground/80">
                                <SearchIcon size={16} />
                            </div>

                            {isDropdownOpen && searchValue && (
                                <div className="absolute mt-1 top-full w-full shadow bg-white">
                                    {filteredItems.length > 0
                                        ? (
                                            filteredItems.map(User => (
                                                <div
                                                    key={User.UserId}
                                                    className="px-4 py-2 border-b border-muted-foreground/30 rounded hover:bg-accent cursor-pointer"
                                                    onClick={() => {
                                                        onDropdownSelect(User.UserId);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    <ul>
                                                        <li>{User.Name}</li>
                                                    </ul>
                                                </div>
                                            ))
                                        )
                                        : (
                                            <div className="px-4 py-2 text-muted-foreground">
                                                Uh oh! No members found.
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side: Layout button */}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground w-10 h-10 rounded-full shadow-none"
                        aria-label="Open layout view"
                        onClick={() => view === "column" ? setView("gallery") : setView("column")}
                    >
                        {view === "column"
                            ? (
                                <GalleryHorizontalIcon className="scale-115" aria-hidden />
                            )
                            : (
                                <TableProperties className="scale-115" aria-hidden="true" />
                            )}
                    </Button>
                </div>
            </header>
        );
    }
);
