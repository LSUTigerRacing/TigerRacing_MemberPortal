import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar06 />
            <div className="flex h-screen justify-center items-center">
                <button onClick={() => navigate("TaskPortal")} className="rounded-lg bg-gray-900 px-4 py-2 text-white">
                    Go to Tasks
                </button>
            </div>
        </>
    );
};
