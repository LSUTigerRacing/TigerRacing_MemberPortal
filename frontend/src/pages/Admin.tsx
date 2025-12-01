import { useEffect, useState, useMemo } from "react";

import GalleryCard from "@/components/pages/admin/GalleryCard";
import MemberTable from "@/components/pages/admin/MemberTable";
import SearchBar from "@/components/pages/admin/SearchBar";

import type { User } from "@/lib/member-data-format/user";

import { getUsers, deleteUser } from "@/services/userService";

import { System, Subsystem } from "../../../shared/config/enums";

export default function Admin () {
    const [view, setView] = useState<"column" | "gallery">("column");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [filters, setFilters] = useState({
        systems: [] as System[],
        subsystems: [] as Subsystem[],
        years: [] as number[]
    });
    const [searchValue, setSearchValue] = useState("");

    const [filteredCount, setFilteredCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filteredMembers = useMemo(() => {
        // Optimized for O(n) time, minimizes constant reference lookups.
        const searchVal = searchValue.toLowerCase();
        return (
            (
                filters.systems.length > 0
                || filters.subsystems.length > 0
                || filters.years.length > 0
            )
                ? users.filter(user => (
                    user.name.toLowerCase().includes(searchVal)
                    && (!filters.systems.length || !filters.systems.includes(user.system))
                    && (!filters.subsystems.length || !filters.subsystems.includes(user.subsystem))
                    && (!filters.years.length || !filters.years.includes(user.gradDate))
                ))
                : users.filter(user => user.name.toLowerCase().includes(searchVal))
        ).sort((a, b) => (
            sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        ));
    }, [sortOrder, filters, users, searchValue]);

    async function handleDelete (userId: string) {
        try {
            await deleteUser(userId, "confirm");

            const updatedMembers = users.filter(user => user.id !== userId);
            setUsers(updatedMembers);
        } catch (err) {
            console.error("Failed to delete member: ", err);

            // TODO: Use Alert component rather than window.alert().
            alert("Error in deleting member.");
        }
    }

    function handleRowClick (rowId: string) {
        setView("gallery");
        setSelectedMemberId(rowId);
    }

    async function fetchMembers () {
        try {
            setLoading(true);
            setError(null);

            const users = await getUsers();
            if (users) setUsers(users);
        } catch (err) {
            console.error("Error fetching members: ", err);
            setError("Failed to load members. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        setFilteredCount(filteredMembers.length);
    }, [filteredMembers, setFilteredCount]);

    return (
        <div className="xl:mt-16.75 px-8">
            <div className="rounded-sm pt-4">
                <SearchBar
                    view={view}
                    setView={setView}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    filters={filters}
                    setFilters={setFilters}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    filteredCount={filteredCount}
                />

                {loading
                    ? (
                        <div className="bg-background w-full my-4 py-4 rounded-xl">
                            <h1>Loading members...</h1>
                            <div className="overflow-hidden"></div>
                        </div>
                    )
                    : error
                        ? (
                            <div className="bg-background w-full my-4 py-4 rounded-xl">
                                <h1>Error loading members. Please retry.</h1>
                                <div className="overflow-hidden"></div>
                            </div>
                        )
                        : view === "column"
                            ? (
                                <MemberTable
                                    users={filteredMembers}
                                    onDeleteMember={handleDelete}
                                    onRowClick={handleRowClick}
                                />
                            )
                            : (
                                <GalleryCard
                                    users={filteredMembers}
                                    view={view}
                                    setView={setView}
                                    onDeleteMember={handleDelete}
                                    selectedMemberId={selectedMemberId}
                                />

                            )
                }
            </div>
        </div>
    );
};
