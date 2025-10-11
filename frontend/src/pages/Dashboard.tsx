import type { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";
import {
    CalendarClock,
    CalendarDays,
    CircleUser,
    ClipboardList,
    Clock,
    FileText,
    Folder,
    GraduationCap,
    ListChecks,
    Mail,
    Megaphone,
    Presentation,
    Settings,
    ShoppingCart,
    UserCog,
    type LucideProps
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

function SidebarButton (props: { title: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, url: string }) {
    return (
        <Button variant="ghost" className="justify-start hover:bg-primary hover:text-secondary" onClick={(() => window.open(props.url, "_self"))}>
            <props.icon />
            {props.title}
        </Button>
    );
};

export function Dashboard (): ReactElement {
    return (
        <div className="flex flex-col xl:flex-row w-full xl:h-dvh">
            {/* Sidebar */}
            <Card className="w-full xl:max-w-xs h-full rounded-none bg-accent shadow-none gap-2">
                <CardHeader className="xl:mt-16">
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2 h-full">
                        <SidebarButton title="Projects" url="/projects" icon={Folder} />
                        <SidebarButton title="Purchase Requests" url="/purchase-requests" icon={ShoppingCart} />
                        <SidebarButton title="Inbox" url="/mail" icon={Mail} />
                        <SidebarButton title="Profile" url="/profile" icon={CircleUser} />
                        <SidebarButton title="Settings" url="/settings" icon={Settings} />
                    </div>
                </CardContent>
                <CardHeader className="mt-4">
                    <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                    <div className="flex flex-col gap-2 h-full">
                        <SidebarButton title="Training Resources" url="/resources" icon={GraduationCap} />
                        <SidebarButton title="Documentation" url="/docs" icon={FileText} />
                        <div className="grow"></div>
                        <SidebarButton title="Admin" url="/admin" icon={UserCog} />
                    </div>
                </CardContent>
            </Card>

            {/* Main Dashboard */}
            <div className="sm:px-4 xl:p-8 grow mt-16">
                <div className="flex flex-col lg:flex-row gap-4">
                    <Card className="bg-primary border-primary text-background rounded-sm lg:max-w-xs px-4 pt-8">
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="mb-4 size-fit max-w-xs">
                                <AvatarImage src="https://github.com/DamienVesper.png" alt="User profile picture" />
                                {/* TODO: fix incorrectly sized avatar fallback */}
                                <AvatarFallback>DV</AvatarFallback>
                            </Avatar>
                            <span>Hi, Car McCarface!</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary border-primary text-background rounded-sm grow">
                        <CardHeader className="flex flex-col items-center">
                            <h2 className="flex items-center">
                                <ClipboardList className="me-2" />
                                My Tasks
                            </h2>
                            <Separator className="mt-1.75" />
                        </CardHeader>
                        <CardContent>
                            <div className="p-8 rounded-sm bg-background">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon" className="bg-accent">
                                            <ListChecks />
                                        </EmptyMedia>
                                        <EmptyTitle className="text-foreground">No Tasks</EmptyTitle>
                                        <EmptyDescription>You don&apos;t have any tasks!</EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 my-4">
                    <Card className="bg-background text-foreground rounded-sm grow">
                        <CardHeader className="flex flex-col items-center">
                            <h2 className="flex items-center">
                                <Megaphone className="me-2" />
                                Announcements
                            </h2>
                            <Separator className="mt-1.75" />
                        </CardHeader>
                        <CardContent>
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" className="bg-accent">
                                        <ListChecks />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-foreground">No Announcements</EmptyTitle>
                                    <EmptyDescription>Nothing new today.</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                    <Card className="bg-background text-foreground rounded-sm grow">
                        <CardHeader className="flex flex-col items-center">
                            <h2 className="flex items-center">
                                <CalendarClock className="me-2" />
                                Upcoming Deadlines
                            </h2>
                            <Separator className="mt-1.75" />
                        </CardHeader>
                        <CardContent>
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" className="bg-accent">
                                        <Clock />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-foreground">No Upcoming Deadlines</EmptyTitle>
                                    <EmptyDescription>You&apos;re all caught up!</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                    <Card className="bg-background text-foreground rounded-sm grow">
                        <CardHeader className="flex flex-col items-center">
                            <h2 className="flex items-center">
                                <CalendarDays className="me-2" />
                                Upcoming Events
                            </h2>
                            <Separator className="mt-1.75" />
                        </CardHeader>
                        <CardContent>
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" className="bg-accent">
                                        <Presentation />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-foreground">No Upcoming Events</EmptyTitle>
                                    <EmptyDescription>Take it nice and easy.</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
