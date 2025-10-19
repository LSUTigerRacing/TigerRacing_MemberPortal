/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios from "axios";
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
import {
    useEffect,
    useState,
    type ForwardRefExoticComponent,
    type ReactElement,
    type RefAttributes
} from "react";

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

interface Task {}
interface Announcement {}
interface Deadline {}
interface Event {}

interface DashboardData {
    displayName: string
    initials: string
    avatarURL: string

    tasks: Task[]
    announcements: Announcement[]
    deadlines: Deadline[]
    events: Event[]
}

/**
 * Fetch dashboard data.
 */
async function getDashboardData (): Promise<DashboardData | undefined> {
    const res = await axios.get<DashboardData>("/api/dashboard", { withCredentials: true }).catch(err => console.error(err));
    return res?.data ?? undefined;
}

function TaskCard<T = { data: Task }> (props: T): ReactElement<T> {
    return (
        <div></div>
    );
}

function AnnouncementCard<T = { data: Announcement }> (props: T): ReactElement<T> {
    return (
        <div></div>
    );
}

function DeadlineCard<T = { data: Deadline }> (props: T): ReactElement<T> {
    return (
        <div></div>
    );
}

function EventCard<T = { data: Event }> (props: T): ReactElement<T> {
    return (
        <div></div>
    );
}

function SidebarButton (props: { title: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, url: string }) {
    return (
        <Button variant="ghost" className="justify-start hover:bg-primary hover:text-secondary" onClick={() => window.open(props.url, "_self")}>
            <props.icon />
            {props.title}
        </Button>
    );
};

export default function Dashboard (): ReactElement {
    const [data, setData] = useState<DashboardData | undefined>(undefined);

    useEffect(() => {
        (async function () {
            const dashData = await getDashboardData();
            setData(dashData);
        })();
    }, []);

    return (
        <div className="flex flex-col xl:flex-row w-full xl:h-dvh">
            {/* for accessibility scoring on dashboard */}
            <h1 className="hidden">Dashboard</h1>

            {/* Sidebar */}
            <Card className="w-full xl:max-w-xs h-screen rounded-none bg-accent shadow-none gap-2">
                <CardHeader className="xl:mt-16.75">
                    <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <SidebarButton title="Projects" url="/projects" icon={Folder} />
                        <SidebarButton title="Orders" url="/orders" icon={ShoppingCart} />
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
            <div className="sm:px-4 xl:p-8 grow mt-16 overflow-auto">
                <div className="flex flex-col lg:flex-row gap-4">
                    <Card className="bg-primary border-primary text-background rounded-sm lg:max-w-xs px-4 pt-8">
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="mb-4 size-fit max-w-xs">
                                {/* TODO: fix incorrectly sized avatar fallback */}
                                {data?.avatarURL
                                    ? <AvatarImage src={data.avatarURL} alt="User profile picture" />
                                    : <AvatarFallback>{data?.initials ?? "CM"}</AvatarFallback>
                                }
                            </Avatar>
                            <span>Hi, {data?.displayName ?? "Car McCarface"}!</span>
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
                                {data?.tasks.length
                                    ? data.tasks.map((x, i) => <TaskCard key={i} data={x} />)
                                    : (
                                        <Empty>
                                            <EmptyHeader>
                                                <EmptyMedia variant="icon" className="bg-accent">
                                                    <ListChecks />
                                                </EmptyMedia>
                                                <EmptyTitle className="text-foreground">No Tasks</EmptyTitle>
                                                <EmptyDescription>You don&apos;t have any tasks!</EmptyDescription>
                                            </EmptyHeader>
                                        </Empty>
                                    )
                                }
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
                            {data?.announcements.length
                                ? data.announcements.map((x, i) => <AnnouncementCard key={i} data={x} />)
                                : (
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon" className="bg-accent">
                                                <ListChecks />
                                            </EmptyMedia>
                                            <EmptyTitle className="text-foreground">No Announcements</EmptyTitle>
                                            <EmptyDescription>Nothing new today.</EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                )
                            }
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
                            {data?.deadlines.length
                                ? data.deadlines.map((x, i) => <DeadlineCard key={i} data={x} />)
                                : (
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon" className="bg-accent">
                                                <Clock />
                                            </EmptyMedia>
                                            <EmptyTitle className="text-foreground">No Upcoming Deadlines</EmptyTitle>
                                            <EmptyDescription>You&apos;re all caught up!</EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                )
                            }
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
                            {data?.events.length
                                ? data.events.map((x, i) => <EventCard key={i} data={x} />)
                                : (
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon" className="bg-accent">
                                                <Presentation />
                                            </EmptyMedia>
                                            <EmptyTitle className="text-foreground">No Upcoming Events</EmptyTitle>
                                            <EmptyDescription>Take it nice and easy.</EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                )
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
