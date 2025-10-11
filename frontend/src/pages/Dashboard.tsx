import type { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";
import {
    CalendarClock,
    CalendarDays,
    CircleUser,
    ClipboardList,
    Clock,
    FileText,
    GraduationCap,
    ListChecks,
    Mail,
    Megaphone,
    Presentation,
    Settings,
    TrendingUp,
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
        <Button variant="ghost" className="justify-start" onClick={(() => window.open(props.url, "_self"))}>
            <props.icon />
            {props.title}
        </Button>
    );
};

export function Dashboard (): ReactElement {
    return (
        <div className="flex w-full h-dvh">
            {/* Sidebar */}
            <Card className="w-full max-w-xs h-full rounded-none bg-gray-300 shadow-none gap-2">
                <CardHeader className="mt-16">
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                    <div className="flex flex-col gap-2 h-full">
                        <SidebarButton title="Profile" url="/profile" icon={CircleUser} />
                        <SidebarButton title="Financials" url="/financials" icon={TrendingUp} />
                        <SidebarButton title="Training Resources" url="/resources" icon={GraduationCap} />
                        <SidebarButton title="Documentation" url="/docs" icon={FileText} />
                        <SidebarButton title="Inbox" url="/mail" icon={Mail} />
                        <SidebarButton title="Settings" url="/settings" icon={Settings} />
                        <div className="flex-grow"></div>
                        <SidebarButton title="Admin" url="/admin" icon={UserCog} />
                    </div>
                </CardContent>
            </Card>

            {/* literally everything else */}
            <div className="p-8 flex-grow mt-16">
                <div className="flex gap-4">
                    <Card className="bg-primary text-white rounded-sm max-w-xs px-4 pt-8">
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="mb-4 size-fit">
                                <AvatarImage src="https://github.com/DamienVesper.png" alt="User profile picture" />
                                <AvatarFallback>DV</AvatarFallback>
                            </Avatar>
                            <span>Hi, Car McCarface!</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white rounded-sm flex-grow">
                        <CardHeader className="flex flex-col items-center">
                            <h2 className="flex items-center">
                                <ClipboardList className="me-2" />
                                My Tasks
                            </h2>
                            <Separator className="mt-1.75" />
                        </CardHeader>
                        <CardContent>
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon" className="bg-gray-300">
                                        <ListChecks />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-gray-300">No Tasks</EmptyTitle>
                                    <EmptyDescription className="text-gray-400">You don&apos;t have any tasks!</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex gap-4 mt-4">
                    <Card className="bg-primary text-white rounded-sm flex-grow">
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
                                    <EmptyMedia variant="icon" className="bg-gray-300">
                                        <ListChecks />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-gray-300">No Announcements</EmptyTitle>
                                    <EmptyDescription className="text-gray-400">Nothing new today.</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white rounded-sm flex-grow">
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
                                    <EmptyMedia variant="icon" className="bg-gray-300">
                                        <Clock />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-gray-300">No Upcoming Deadlines</EmptyTitle>
                                    <EmptyDescription className="text-gray-400">You&apos;re all caught up!</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white rounded-sm flex-grow">
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
                                    <EmptyMedia variant="icon" className="bg-gray-300">
                                        <Presentation />
                                    </EmptyMedia>
                                    <EmptyTitle className="text-gray-300">No Upcoming Events</EmptyTitle>
                                    <EmptyDescription className="text-gray-400">Take it nice and easy.</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
