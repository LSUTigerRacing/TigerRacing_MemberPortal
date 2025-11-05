'use client';

import * as React from 'react';
import { useId, useState, useRef, useEffect } from 'react';

import { data, type Member } from "@/components/dummyData/members";
import { TableProperties, FunnelIcon, SearchIcon, GalleryHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { System, Subsystem } from "@/components/dummyData/members";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import FilterDropdown from "@/components/ui/adminPortal/SearchBar/FilterDropdown";

export interface Navbar14Props extends React.HTMLAttributes<HTMLElement> {
  searchPlaceholder?: string;
  searchValue?: string;
  view: "column" | "gallery";
  setView: React.Dispatch<React.SetStateAction<"column" | "gallery">>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  onFiltersChange: (filteredMembers: Member[]) => void;
  onSearchChange?: (value: string) => void;
}

export const Navbar14 = React.forwardRef<HTMLElement, Navbar14Props>(
  (
    {
      className,
      searchPlaceholder = 'Search for members...',
      view,
      setView,
      sortOrder,
      setSortOrder,
      onFiltersChange,
      ...props
    },
    ref
  ) => {
    const id = useId();

    // Search and filtering state
    const [searchValue, setSearchValue] = useState("");
    const [filteredItems, setFilteredItems] = useState<Member[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);

      const filtered = data.filter((member) =>
        member.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
      if (value.length > 0) setIsDropdownOpen(true);
    };

    // Use effects for clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
      if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const [filteredCount, setFilteredCount] = useState(0);
    const [filters, setFilters] = useState({
      selectedSystems: [] as System[],
      selectedSubsystems: [] as Subsystem[],
      selectedYears: [] as Member["grad"][],
    });

    return (
      <header
        ref={ref}
        className={cn('px-4 md:px-6 [&_*]:no-underline', className)}
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
                  onClick={(e) => e.preventDefault()}
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
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  onFiltersChange={onFiltersChange}
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
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-muted-foreground/80">
                <SearchIcon size={16} />
              </div>

              {isDropdownOpen && searchValue && (
                <div className="absolute mt-1 top-full bg-white">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((member) => (
                      <div
                        key={member.id}
                        className="px-4 py-2 hover:bg-accent cursor-pointer"
                      >
                        <ul>
                          <li>{member.name}</li>
                        </ul>
                      </div>
                    ))
                  ) : (
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
            {view === "column" ? (
              <GalleryHorizontalIcon className="scale-115" aria-hidden />
            ) : (
              <TableProperties className="scale-115" aria-hidden="true" />
            )}
          </Button>
        </div>
      </header>
    );
  }
);

Navbar14.displayName = 'Navbar14';
