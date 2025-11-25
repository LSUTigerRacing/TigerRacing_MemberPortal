/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction
} from "react";
import { Circle } from "lucide-react";

import { getUsers } from "@/services/userService";

import {
    subsystemCategories,
    type System,
    type Subsystem,
    type User
} from "@/lib/dummyData/user";

interface FilterDropdownProps {
    onFilterChange: (filteredMembers: User[]) => void
    filters: {
        systems: System[]
        subsystems: Subsystem[]
        years: string[]
    }
    setFilters: Dispatch<SetStateAction<FilterDropdownProps["filters"]>>
    filteredCount: number
    setFilteredCount: Dispatch<SetStateAction<number>>
    sortOrder: "asc" | "desc"
    setSortOrder: Dispatch<SetStateAction<FilterDropdownProps["sortOrder"]>>
}

const FilterDropdown = ({
    onFilterChange,
    filters,
    setFilters,
    filteredCount,
    setFilteredCount,
    sortOrder,
    setSortOrder
}: FilterDropdownProps) => {
    // Derived Data (Filtered Members)
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const users = await getUsers();
            setUsers(users);
        } catch (err) {
            console.error("Error fetching members: ", err);
            setError("Failed to load members. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filteredMembers = users.filter(User => {
        if (
            filters.systems.length === 0
            && filters.subsystems.length === 0
            && filters.years.length === 0
        ) {
            return true;
        }

        const systemMatch = filters.systems.length === 0 || filters.systems.includes(User.System as System);
        const subsystemMatch = filters.subsystems.length === 0 || (User.Subsystem && filters.subsystems.includes(User.Subsystem as Subsystem));
        const yearMatch = filters.years.length === 0 || filters.years.includes(User.GradDate);

        return systemMatch && subsystemMatch && yearMatch;
    });

    const sortedMembers = [...filteredMembers].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.Name.localeCompare(b.Name);
        } else {
            return b.Name.localeCompare(a.Name);
        }
    });

    // Event Handlers
    const handleSystemToggle = (system: System) => {
        setFilters(prev => ({
            ...prev,
            systems: prev.systems.includes(system)
                ? prev.systems.filter(s => s !== system)
                : [...prev.systems, system]
        }));
    };

    const handleSubsystemToggle = (subsystem: Subsystem) => {
        setFilters(prev => ({
            ...prev,
            subsystems: prev.subsystems.includes(subsystem)
                ? prev.subsystems.filter(s => s !== subsystem)
                : [...prev.subsystems, subsystem]
        }));
    };

    const handleYearToggle = (gradYear: User["GradDate"]) => {
        setFilters(prev => ({
            ...prev,
            years: prev.years.includes(gradYear)
                ? prev.years.filter(g => g !== gradYear)
                : [...prev.years, gradYear]
        }));
    };

    const handleSort = (order: "asc" | "desc") => setSortOrder(order);

    const handleReset = () => {
        setFilters({
            systems: [],
            subsystems: [],
            years: []
        });
    };

    // Active Filtering Summary

    const getActiveFilters = () => {
        const active = [];
        if (filters.systems.length > 0)
            active.push(`Systems: ${filters.systems.join(", ")}`);
        if (filters.subsystems.length > 0)
            active.push(`Subsystem: ${filters.subsystems.join(", ")}`);
        if (filters.years.length > 0)
            active.push(`Graduation Years: ${filters.years.join(", ")}`);
        return active;
    };

    // Hooks: Filter Updates and Count Tracking

    useEffect(() => {
        onFilterChange(sortedMembers);
    }, [filters, sortOrder, users, onFilterChange]);

    useEffect(() => {
        setFilteredCount(filteredMembers.length);
    }, [filteredMembers, setFilteredCount]);

    // Render
    if (loading) {
        return (
            <div className="flex justify-center">
                <h1>Loading members...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center">
                <h1>Error loading members. Please retry.</h1>
            </div>
        );
    }

    return (
        <div className="bg-background px-6 py-4 mx-auto overflow-y-auto max-h-[80vh] max-w-full">
            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-6 mb-4">
                    {/* Graduation Year Filter */}
                    <div className="space-y-4">
                        <h3 className="inline-block shadow-none font-manrope font-semibold border-b border-b-black">
                            Grad Year
                        </h3>
                        <div className="flex justify-between">
                            {Array.from(new Set(users.map(User => User.GradDate)))
                                .sort()
                                .map(GradDate => (
                                    <button
                                        key={GradDate}
                                        onClick={() => handleYearToggle(GradDate)}
                                        className={`font-sora inline-block not-first:items-center gap-2 p-2 rounded-lg transition-colors ${
                                            filters.years.includes(GradDate)
                                                ? "bg-primary/60 text-background"
                                                : "bg-gray-100 dark:bg-gray-700"
                                        }`}
                                    >
                                        {GradDate}
                                    </button>
                                ))}
                        </div>
                    </div>

                    {/* System Filters */}
                    <div className="gap-2">
                        <div className="space-y-4">
                            <h3 className="inline-block font-manrope mb-2 font-semibold border-b border-b-black">
                                System & Subsystem
                            </h3>
                            <div className="flex justify-between gap-3">
                                {(Object.keys(subsystemCategories) as System[]).map(system => (
                                    <div key={system} className="flex flex-col gap-4">
                                        <button
                                            onClick={() => handleSystemToggle(system)}
                                            className={`flex text-2xl items-center gap-2 p-2 rounded-xl max-h-fit transition-colors ${
                                                filters.systems.includes(system)
                                                    ? "bg-primary/60 text-foreground"
                                                    : "bg-primary text-background dark:bg-gray-700"
                                            }`}
                                        >
                                            <Circle size={16} />
                                            <span className="h3 text-lg">{system}</span>
                                        </button>

                                        {/* Subsystem Filters */}
                                        <div className="flex flex-col gap-2">
                                            {subsystemCategories[system].map(subsystem => (
                                                <button
                                                    key={subsystem}
                                                    onClick={() => handleSubsystemToggle(subsystem)}
                                                    className={`flex items-center gap-2 p-2 max-h-fit rounded-lg transition-colors ${
                                                        filters.subsystems.includes(subsystem)
                                                            ? "bg-primary/25 text-foreground"
                                                            : "bg-background dark:bg-gray-700"
                                                    }`}
                                                >
                                                    <Circle size={16} />
                                                    <span className="manrope-body">{subsystem}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ascending/Descending Filters */}
                    <div className="space-y-4">
                        <h3 className="inline-block shadow-none font-manrope font-semibold border-b border-b-black">
                            Sort by Members
                        </h3>
                        <div className="flex justify-between pb-3">
                            <button
                                onClick={() => handleSort("asc")}
                                className={`font-sora inline-block not-first:items-center gap-2 p-2 rounded-lg transition-colors ${
                                    sortOrder === "asc"
                                        ? "bg-primary/60 text-background"
                                        : "bg-gray-100 dark:bg-gray-700"
                                }`}
                            >
                                Ascending (A-Z)
                            </button>
                            <button
                                onClick={() => handleSort("desc")}
                                className={`font-sora inline-block not-first:items-center gap-2 p-2 rounded-lg transition-colors ${
                                    sortOrder === "desc"
                                        ? "bg-primary/60 text-background"
                                        : "bg-gray-100 dark:bg-gray-700"
                                }`}
                            >
                                Descending (Z-A)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active Filters */}
                <div className="border-t dark:border-gray-700 pt-4">
                    <h3 className="font-sora mb-2">Active Filters</h3>
                    <div className="flex flex-wrap gap-2 pb-2 max-w-full">
                        {getActiveFilters().map((filter, index) => (
                            <span
                                key={index}
                                className="font-sora px-3 py-1 bg-background dark:bg-foreground text-foreground dark:text-blue-200 rounded-full text-sm shrink-0 max-w-full wrap-break-word"
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
                <div className="flex justify-between items-center gap-4 pt-4 border-t dark:border-gray-700 font-sora">
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
