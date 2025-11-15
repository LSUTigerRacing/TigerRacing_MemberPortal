import { useState } from "react";
import { data, type Member } from "@/components/dummyData/members";

import { Navbar } from "@/components/ui/NavBar/shadcn-io/navbar-06";
import { SearchBar } from "@/components/ui/adminPortal/SearchBar/shadcn-io/SearchBar/index";
import MemberTable from "@/components/ui/adminPortal/MemberTable/MemberTable";
import GalleryCard from "@/components/ui/adminPortal/GalleryPageCard/GalleryCard";

export const PagesView = () => {
    const [view, setView] = useState<"column" | "gallery">("column");
    const [filteredMembers, setFilteredMembers] = useState<Member[]>(
        [...data].sort((a, b) => a.name.localeCompare(b.name))
    );
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleDelete = (memberId: string) => {
        const updatedMembers = filteredMembers.filter(member => member.id !== memberId);
        setFilteredMembers(updatedMembers);
    };

    const handleRowClick = (rowId: string) => {
        setView("gallery");
        setSelectedMemberId(rowId);
    };

    const dropdownSelect = (memberId: string) => {
        setView("gallery");
        setSelectedMemberId(memberId);
    };

    return (
        <>
            <Navbar />
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
                        members={filteredMembers}
                        onDeleteMember={handleDelete}
                        onRowClick={handleRowClick}
                    />
                )
                : (
                    <GalleryCard
                        members={filteredMembers}
                        view={view}
                        setView={setView}
                        onDeleteMember={handleDelete}
                        selectedMemberId={selectedMemberId}
                    />
                )}
        </>
    );
};
