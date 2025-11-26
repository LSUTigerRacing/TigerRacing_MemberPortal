import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "@/services/userService";
import type { User } from "@/components/member-data-format/user";

import NavbarComponent from "@/components/layout/Navbar";
import { SearchBar } from "@/components/ui/adminPortal/SearchBar/shadcn-io/SearchBar/index";
import MemberTable from "@/components/pages/admin/MemberTable";
import GalleryCard from "@/components/pages/admin/GalleryCard";

export const PagesView = () => {
    const [view, setView] = useState<"column" | "gallery">("column");
    const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            setError(null);
            const users = await getUsers();
            const sortedMembers = [...users].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
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
                    user => user.userId !== userId
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

    if (loading) {
        return (
            <>
                <NavbarComponent />
                <div className="flex justify-center">
                    <h1>Loading members...</h1>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavbarComponent />
                <div className="flex justify-center pt-10">
                    <p className="text-lg font-sora items-center">Error loading members. Please retry.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavbarComponent />
            <SearchBar
                view={view}
                setView={setView}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onFiltersChange={setFilteredMembers}
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
        </>
    );
};
