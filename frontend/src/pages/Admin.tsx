import { useEffect, useState, useMemo } from "react";

import { SearchBar } from "@/components/pages/admin/SearchBar";
import MemberTable from "@/components/pages/admin/MemberTable";
import GalleryCard from "@/components/pages/admin/GalleryCard";

import type {
    User,
    System,
    Subsystem
} from "@/lib/member-data-format/user";

import { getUsers, deleteUser } from "@/services/userService";

export default function Admin () {
    const [view, setView] = useState<"column" | "gallery">("column");
    const [filters, setFilters] = useState({
        systems: [] as System[],
        subsystems: [] as Subsystem[],
        years: [] as string[]
    });
    const [filteredCount, setFilteredCount] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            setError(null);

            const users = await getUsers();
            setUsers(users);
        } catch (err) {
            console.error("Error fetching members: ", err);
            setError("Failed to load members. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filteredMembers = useMemo(() => {
        let members = users;

        // Filter
        members = members.filter(User => {
            if (
                filters.systems.length === 0 && filters.subsystems.length === 0 && filters.years.length === 0
            ) {
                return true;
            }

            const systemMatch = filters.systems.length === 0 || filters.systems.includes(User.System as System);
            const subsystemMatch = filters.subsystems.length === 0 || (User.Subsystem && filters.subsystems.includes(User.Subsystem as Subsystem));
            const yearMatch = filters.years.length === 0 || filters.years.includes(User.GradDate);

            return systemMatch && subsystemMatch && yearMatch;
        });

        // Search
        members = members.filter(member =>
            member.Name.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Sort
        members = [...members].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.Name.localeCompare(b.Name);
            } else {
                return b.Name.localeCompare(a.Name);
            }
        });

        return members;
    }, [sortOrder, filters, users, searchValue]);

    useEffect(() => {
        setFilteredCount(filteredMembers.length);
    }, [filteredMembers, setFilteredCount]);

    const handleDelete = async (userId: string) => {
        try {
            await deleteUser(userId, "confirm");
            const updatedMembers = users.filter(
                user => user.UserId !== userId
            );
            setUsers(updatedMembers);
        } catch (err) {
            console.error("Failed to delete member: ", err);
            alert("Error in deleting member.");
        }
    };

    const handleRowClick = (rowId: string) => {
        setView("gallery");
        setSelectedMemberId(rowId);
    };

    const dropdownSelect = (memberId: string) => {
        setView("gallery");
        setSelectedMemberId(memberId);
    };

    if (loading) {
        return (
            <div className="xl:mt-16.75 flex justify-center pt-10 px-8">
                <h1>Loading members...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="xl:mt-16.75 flex justify-center pt-10 px-8">
                <p className="text-lg font-sora items-center">
                    Error loading members. Please retry.
                </p>
            </div>
        );
    }

    return (
        <div className="xl:mt-16.75 px-8">
            <div className="rounded-sm pt-4">
                <SearchBar
                    view={view}
                    users={users}
                    setView={setView}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    filters={filters}
                    setFilters={setFilters}
                    filteredCount={filteredCount}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onDropdownSelect={dropdownSelect}
                />

                {view === "column"
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
                    )}
            </div>
        </div>
    );
};
