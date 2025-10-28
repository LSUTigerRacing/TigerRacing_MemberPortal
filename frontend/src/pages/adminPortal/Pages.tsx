import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06"
import { Navbar14 } from "@/components/ui/adminPortal/SearchBar/shadcn-io/navbar-14"
import MemberTable from "@/components/ui/adminPortal/MemberTable/MemberTable"
import GalleryCard from "@/components/ui/adminPortal/GalleryPageCard/GalleryCard"
import { useState } from "react";
import { data, type Member } from "@/components/dummyData/members";

export const PagesView = () => {
 const [view, setView] = useState<"column" | "gallery">("column");
 const [filteredMembers, setFilteredMembers] = useState<Member[]>(data);
 
    return (
        <>
            <Navbar06 />
            <Navbar14 view={view} setView={setView} onFiltersChange={setFilteredMembers} />

            {view === "column" ? (
              <MemberTable members={filteredMembers} /> 
            ) : (
              <GalleryCard members={filteredMembers}/>
            )}
        </>
    );
}


