import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06"
import { Navbar14 } from "@/components/ui/adminPortal/SearchBar/shadcn-io/navbar-14"
import ListCard from "@/components/ui/adminPortal/ListPageCard/ListCard"

export const ListPageView = () => {
    return (
        <>
            <Navbar06 />
            <Navbar14 />
            <ListCard />
        </>
    );
}
export default ListPageView;