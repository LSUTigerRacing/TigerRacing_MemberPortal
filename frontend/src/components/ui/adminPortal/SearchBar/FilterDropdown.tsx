import React, { useState, useEffect } from "react";
import { Circle } from "lucide-react";

import { data, subsystemCategories } from "@/components/dummyData/members";
import type { System, Subsystem, Member } from "@/components/dummyData/members";

interface FilterDropdownProps {
  onFiltersChange: (filteredMembers: Member[]) => void;
}

const FilterDropdown = ({ onFiltersChange }: FilterDropdownProps) => {

  // States/Consts for Selected Systems

  const [filteredCount, setFilteredCount] = useState(0);
  const [filters, setFilters] = useState({
    selectedSystems: [] as System[],
    selectedSubsystems: [] as Subsystem[],
    selectedYears: [] as Member["grad"][],
  });

  // Derived Data (Filtered Members)

  const filteredMembers = data.filter((member) => {
    if (
      filters.selectedSystems.length === 0 &&
      filters.selectedSubsystems.length === 0 &&
      filters.selectedYears.length === 0
    ) {
      return true;
    }

    const systemMatch =
      filters.selectedSystems.length === 0 ||
      member.system.some((s) => filters.selectedSystems.includes(s));

    const subsystemMatch =
      filters.selectedSubsystems.length === 0 ||
      (member.subsystem &&
        member.subsystem.some((ss) => filters.selectedSubsystems.includes(ss)));

    const yearMatch =
      filters.selectedYears.length === 0 ||
      filters.selectedYears.includes(member.grad);

    return systemMatch && subsystemMatch && yearMatch;
  });

  // Handlers for Toggles and Reset

  const handleSystemToggle = (system: System) => {
    setFilters((prev) => ({
      ...prev,
      selectedSystems: prev.selectedSystems.includes(system)
        ? prev.selectedSystems.filter((s) => s !== system)
        : [...prev.selectedSystems, system],
    }));
  };

  const handleSubsystemToggle = (subsystem: Subsystem) => {
    setFilters((prev) => ({
      ...prev,
      selectedSubsystems: prev.selectedSubsystems.includes(subsystem)
        ? prev.selectedSubsystems.filter((s) => s !== subsystem)
        : [...prev.selectedSubsystems, subsystem],
    }));
  };

  const handleYearToggle = (gradYear: Member["grad"]) => {
    setFilters((prev) => ({
      ...prev,
      selectedYears: prev.selectedYears.includes(gradYear)
        ? prev.selectedYears.filter((g) => g !== gradYear)
        : [...prev.selectedYears, gradYear],
    }));
  };

  const handleReset = () => {
    setFilters({
      selectedSystems: [],
      selectedSubsystems: [],
      selectedYears: [],
    });
  };

  // Active Filtering

  const getActiveFilters = () => {
    const active = [];
    if (filters.selectedSystems.length > 0) {
      active.push(`Systems: ${filters.selectedSystems.join(", ")}`);
    }
    if (filters.selectedSubsystems.length > 0) {
      active.push(`Subsystem: ${filters.selectedSubsystems.join(", ")}`);
    }
    if (filters.selectedYears.length > 0) {
      active.push(`Graduation Years: ${filters.selectedYears.join(", ")}`);
    }
    return active;
  };

  // Filter Change and Filter count

  useEffect(() => {
    onFiltersChange(filteredMembers);
  }, [filters, onFiltersChange]);

  useEffect(() => {
    setFilteredCount(filteredMembers.length);
  }, [filters]);

  return (
    <div className="bg-background px-6 py-4 mx-auto overflow-y-auto max-h-[80vh]">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-6 mb-4">

          {/* Graduation Year Filter */}
          <div className="space-y-4">
            <h3 className="inline-block shadow-none font-manrope font-semibold border-b border-b-black">
              Grad Year
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="grid grid-cols-3 gap-2">
                {Array.from(new Set(data.map((member) => member.grad)))
                  .sort()
                  .map((gradYear) => (
                    <button
                      key={gradYear}
                      onClick={() => handleYearToggle(gradYear)}
                      className={`font-sora inline-block not-first:items-center gap-2 p-2 rounded-lg transition-colors ${
                        filters.selectedYears.includes(gradYear)
                          ? "bg-primary-background text-white"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {gradYear}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* System Filters */}
          <div className="gap-2">
            <div className="space-y-4">
              <h3 className="inline-block font-manrope font-semibold border-b border-b-black">
                System & Subsystem
              </h3>

              {(Object.keys(subsystemCategories) as System[]).map((system) => (
                <div key={system} className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => handleSystemToggle(system)}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        filters.selectedSystems.includes(system)
                          ? "bg-primary/50 text-foreground"
                          : "bg-primary text-background dark:bg-gray-700"
                      }`}
                    >
                      <Circle size={16} />
                      <span className="h3 text-lg">{system}</span>
                    </button>

                    {/* Subsystem Filters */}
                    <div className="grid grid-cols-1 gap-2">
                      {subsystemCategories[system].map((subsystem) => (
                        <button
                          key={subsystem}
                          onClick={() => handleSubsystemToggle(subsystem)}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                            filters.selectedSubsystems.includes(subsystem)
                              ? "bg-primary-background text-foreground"
                              : "bg-muted-foreground/50 dark:bg-gray-700"
                          }`}
                        >
                          <Circle size={16} />
                          <span className="manrope-body">{subsystem}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="border-t dark:border-gray-700 pt-4">
          <h3 className="font-sora mb-2">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {getActiveFilters().map((filter, index) => (
              <span
                key={index}
                className="font-sora px-3 py-1 bg-primary-background dark:bg-primary-foreground text-foreground dark:text-blue-200 rounded-full text-sm"
              >
                {filter}
              </span>
            ))}
            {getActiveFilters().length === 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm font-sora">
                No active filters
              </span>
            )}
          </div>
        </div>

        {/* Reset Filters */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t dark:border-gray-700 font-sora">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCount} results found
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-manrope transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;