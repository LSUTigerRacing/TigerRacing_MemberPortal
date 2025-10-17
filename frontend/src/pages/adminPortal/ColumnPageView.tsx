import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06"
import { Navbar14 } from "@/components/ui/adminPortal/SearchBar/shadcn-io/navbar-14"
import MemberTable from "@/components/ui/adminPortal/MemberTable/MemberTable"

export const ColumnPageView = () => {
    return (
        <>
            <Navbar06 />
            <Navbar14 />
            <MemberTable />
        </>
    );
}
export default ColumnPageView;
