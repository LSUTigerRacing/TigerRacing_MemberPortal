'use client';

import * as React from 'react';
import { useId, useState, useRef, useEffect } from 'react';

import { data, type Member } from "@/components/dummyData/members";
import { LayoutGridIcon, FunnelIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface Navbar14Props extends React.HTMLAttributes<HTMLElement> {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onLayoutClick?: () => void;
}

export const Navbar14 = React.forwardRef<HTMLElement, Navbar14Props>(
  (
    {
      className,
      searchPlaceholder = 'Search for members...',
      onLayoutClick,
      ...props
    },
    ref
  ) => {
    const id = useId();

    {/* Consts for Filtering and Search */}
    const [searchValue, setSearchValue] = React.useState("");
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

      if (value.length > 0) {
        setIsDropdownOpen(true);
      }
    };

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      }

      if (isDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isDropdownOpen]);

    return (
      <header
        ref={ref}
        className={cn('px-4 md:px-6 [&_*]:no-underline', className)}
        {...props}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side: Filter button + input */}
          <div className="flex items-center gap-2 flex-1 z-10">
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground w-8 h-8 rounded-full shadow-none"
              aria-label="Open search menu"
              onClick={(e) => e.preventDefault()}
            >
              <FunnelIcon size={16} aria-hidden="true" />
            </Button>

            {/* Input with search icon */}
            <div className="relative flex-1 max-w-xs" ref={dropdownRef}>
              <Input
                id={`input-${id}`}
                className="peer h-8 w-full pl-8 pr-2"
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
            className="text-muted-foreground w-8 h-8 rounded-full shadow-none"
            aria-label="Open layout menu"
            onClick={(e) => {
              e.preventDefault();
              onLayoutClick?.();
            }}
          >
            <LayoutGridIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </header>
    );
  }
);

Navbar14.displayName = 'Navbar14';
