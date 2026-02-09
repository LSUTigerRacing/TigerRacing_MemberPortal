import {
    type Dispatch,
    type SetStateAction
} from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

import { config } from "../../../../../shared/config/config";
import { System, Subsystem } from "../../../../../shared/config/enums";
import type { TRAPI } from "../../../../../shared/typings/api";

const CURRENT_YEAR = new Date().getFullYear();

interface FilterDropdownProps {
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
    filteredCount: number
    sortOrder: "asc" | "desc"
    setSortOrder: Dispatch<SetStateAction<FilterDropdownProps["sortOrder"]>>
}

const FilterDropdown = ({
    filters,
    setFilters,
    filteredCount,
    sortOrder,
    setSortOrder
}: FilterDropdownProps) => {
    const toggleSystem = (system: System) => {
        setFilters(prev => ({
            ...prev,
            systems: prev.systems.includes(system)
                ? prev.systems.filter(s => s !== system)
                : [...prev.systems, system]
        }));
    };

    const toggleSubsystem = (subsystem: Subsystem) => {
        setFilters(prev => ({
            ...prev,
            subsystems: prev.subsystems.includes(subsystem)
                ? prev.subsystems.filter(s => s !== subsystem)
                : [...prev.subsystems, subsystem]
        }));
    };

    const toggleYear = (gradYear: TRAPI.User["gradYear"]) => {
        setFilters(prev => ({
            ...prev,
            years: prev.years.includes(gradYear)
                ? prev.years.filter(g => g !== gradYear)
                : [...prev.years, gradYear]
        }));
    };

    return (
        // mx-auto overflow-y-auto max-h-[80vh] max-w-full
        <div className="px-6 py-4 font-manrope">
            <p className="text-md mb-2">Filter by System</p>
            <div className="flex gap-3">
                {Object.entries(config.systems).map(([system, subsystems], i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <Button className={filters.systems.includes(system as System) ? "bg-gray-500/40 hover:bg-gray-500/60" : "hover:bg-primary/80"} onClick={() => toggleSystem(system as System)}>{system}</Button>
                        <Separator />
                        {subsystems.map((subsystem, i) => (
                            <FieldGroup key={i} className="mx-auto xl:w-56">
                                <Field orientation="horizontal">
                                    <Checkbox id={`filter-${subsystem}`} className="cursor-pointer transition-all" checked={!filters.systems.includes(system as System) && !filters.subsystems.includes(subsystem)} onClick={e => (e.preventDefault(), toggleSubsystem(subsystem))} />
                                    <FieldLabel htmlFor={`filter-${subsystem}`} className="cursor-pointer text-nowrap" onClick={e => (e.preventDefault(), toggleSubsystem(subsystem))}>{subsystem}</FieldLabel>
                                </Field>
                            </FieldGroup>
                        ))}
                    </div>
                ))}
            </div>
            <Separator className="mt-6" />
            <p className="text-md mt-4 mb-2">Filter by Graduation Year</p>
            <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (<Button onClick={() => toggleYear(CURRENT_YEAR + i)} className={filters.years.includes(CURRENT_YEAR + i) ? "bg-gray-500/40 hover:bg-gray-500/60" : "hover:bg-primary/80"}>{i === 3 ? `${CURRENT_YEAR + i}+` : CURRENT_YEAR + i}</Button>))}
            </div>
            <p className="text-md mt-4 mb-2">Sort Order</p>
            <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>{sortOrder === "asc" ? "Ascending (A-Z)" : "Descending (Z-A)"}</Button>

            <Separator className="my-4" />
            <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">{filteredCount} results</span>
                <Button
                    variant="destructive"
                    onClick={() => setFilters({ systems: [], subsystems: [], years: [] })}
                    disabled={filters.subsystems.length === 0 && filters.systems.length === 0 && filters.years.length === 0}
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default FilterDropdown;
