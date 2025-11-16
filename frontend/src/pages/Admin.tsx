import { useState } from "react";
import { data, type Member } from "@/lib/dummyData/members";

import SearchBar from "@/components/ui/admin/SearchBar";
import MemberTable from "@/components/ui/admin/MemberTable";
import GalleryCard from "@/components/ui/admin/GalleryCard";

export default function Admin () {
    const [view, setView] = useState<"column" | "gallery">("column");
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([...data].sort((a, b) => a.name.localeCompare(b.name)));
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
            </div>
        </div>
    );
};
