import {
    FileText,
    GraduationCap,
    Home,
    Mail,
    Settings,
    ShoppingCart
} from "lucide-react";

import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";

// Menu items.
const items: Array<{ title: string, url: string, icon: any }> = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home
    },
    {
        title: "Inbox",
        url: "/mail",
        icon: Mail
    },
    {
        title: "Purchasing",
        url: "/purchase",
        icon: ShoppingCart
    },
    {
        title: "Training Resources",
        url: "#",
        icon: GraduationCap
    },
    {
        title: "Documentation",
        url: "/docs",
        icon: FileText
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings
    }
];

export function Sidebar () {
    return (
        <ShadcnSidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </ShadcnSidebar>
    );
}
