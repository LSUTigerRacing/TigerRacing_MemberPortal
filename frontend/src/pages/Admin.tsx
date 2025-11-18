import { useEffect, useState } from "react";

import SearchBar from "@/components/pages/admin/SearchBar";
import MemberTable from "@/components/pages/admin/MemberTable";
import GalleryCard from "@/components/pages/admin/GalleryCard";

import type { User } from "@/lib/dummyData/user";

import { getUsers, deleteUser } from "@/services/userService";

export default function Admin () {
    const [view, setView] = useState<"column" | "gallery">("column");
    const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            setError(null);

            const users = await getUsers();
            const sortedMembers = [...users].sort((a, b) => a.Name.localeCompare(b.Name));

            setFilteredMembers(sortedMembers);
        } catch (err) {
            console.error("Error fetching members: ", err);
            setError("Failed to load members. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: string) => {
        try {
            const success = await deleteUser(userId, "confirm");
            if (success) {
                const updatedMembers = filteredMembers.filter(
                    user => user.UserId !== userId
                );
                setFilteredMembers(updatedMembers);
            } else {
                alert("Failed to load member.");
            }
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

    useEffect(() => {
        fetchMembers();
    }, []);

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
                <p className="text-lg font-sora items-center">Error loading members. Please retry.</p>
            </div>
        );
    }

    return (
        <div className="xl:mt-16.75 px-8">
            <div className="rounded-sm pt-4">
                <SearchBar
                    view={view}
                    setView={setView}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    // TODO: Extract only the filters from FilterDropdown and SearchBar, and then compute the member list in this Admin component.
                    // This way, the filters do not override each other when both are used.
                    onFilterChange={setFilteredMembers}
                    onSearchChange={setFilteredMembers}
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
