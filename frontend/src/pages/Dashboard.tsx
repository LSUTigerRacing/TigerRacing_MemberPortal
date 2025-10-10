import { Sidebar } from "@/components/dashboard/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function Dashboard () {
    return (
        <SidebarProvider>
            <Sidebar />
            <SidebarInset>
                <div>
                    <SidebarTrigger />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};
