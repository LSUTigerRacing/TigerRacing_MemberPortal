import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06"
import { Navbar14 } from "@/components/ui/adminPortal/SearchBar/shadcn-io/navbar-14"
import GalleryCard from "@/components/ui/adminPortal/GalleryPageCard/GalleryCard"

export const GalleryPageView = () => {
    return (
        <>
            <Navbar06 />
            <Navbar14 />
            <GalleryCard />
        </>
    );
}
export default GalleryPageView;