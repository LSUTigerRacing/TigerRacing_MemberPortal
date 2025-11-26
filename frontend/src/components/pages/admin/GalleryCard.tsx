import type { User } from "@/components/member-data-format/user";
import { getTaskByUserId } from "@/services/taskService";
import { type Task } from "@/components/member-data-format/task";

import {
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction
} from "react";
import { ListTodoIcon, ArrowLeftFromLine } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";

import MemberDropdown from "@/components/pages/admin/MemberDropdown";

interface FilterMemberCarouselProps {
    users: User[]
    onDeleteMember: (memberId: string) => void
    selectedMemberId: string | null
    view: "column" | "gallery"
    setView: Dispatch<SetStateAction<"column" | "gallery">>
}

export default function CarouselDemo ({
    users,
    onDeleteMember,
    selectedMemberId,
    view,
    setView
}: FilterMemberCarouselProps) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!carouselApi || !selectedMemberId) return;

        const selectedIndex = users.findIndex(
            user => user.userId === selectedMemberId
        );

        if (selectedIndex !== -1) {
            carouselApi.scrollTo(selectedIndex, true);
        }
    }, [carouselApi, selectedMemberId, users]);

    useEffect(() => {
        if (!selectedMemberId) return;

        const fetchTasks = async () => {
            try {
                const tasks = await getTaskByUserId(selectedMemberId);
                setTasks(tasks);
            } catch (error) {
                console.error("Error fetching tasks", error);
            }
        };

        fetchTasks();
    }, [selectedMemberId, setTasks]);

    return (
        <Carousel
            className="max-w-3xl max-h-screen mx-auto flex flex-column justify-self-center-safe mt-6 p-0"
            setApi={setCarouselApi}
        >
            <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground w-10 h-10 rounded-full shadow-none"
                aria-label="Back to column view"
                onClick={() =>
                    view === "gallery" ? setView("column") : setView("gallery")}
            >
                <ArrowLeftFromLine className="scale-115 text-red-500" aria-hidden />
            </Button>
            <CarouselContent>
                {users.map(user => (
                    <CarouselItem key={user.userId}>
                        <div className="flex justify-between p-1 max-w-full gap-2">
                            <Card className="w-full h-full bg-background rounded-2xl">
                                <CardContent className="flex flex-col w-full p-5">
                                    {/* Avatar and Member Info Section */}
                                    <div className="flex mb-4">
                                        {/* Avatar Section */}
                                        <div className="flex max-h-full text-4xl">
                                            <Avatar className="h-15 w-15">
                                                <AvatarImage
                                                    src="https://github.com/shadcn.png"
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        {/* Container for Name and Details */}
                                        <div className="flex flex-col">
                                            {/* Container for Name and More Icon */}
                                            <div className="flex flex-row gap-3">
                                                <div className="ml-4 font-manrope font-semibold text-2xl text-foreground pb-2">
                                                    {user.name}
                                                </div>
                                                <MemberDropdown user={user} onDeleteMember={onDeleteMember} />
                                            </div>

                                            {/* Details Section */}
                                            <div className="flex gap-20">
                                                <div className="ml-4 font-sora text-gray-600">
                                                    {user.lsuEmail}
                                                </div>
                                                <div className="ml-4 font-sora text-gray-600">
                                                    {user.system}
                                                </div>
                                                <div className="ml-4 font-sora text-gray-600">
                                                    {user.gradDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Two Column Info Section */}
                                    <div className="flex gap-x-20 w-full mb-4">
                                        {/* Info Section */}
                                        <div className="flex flex-col flex-1">
                                            <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold text-2xl text-foreground p-2">
                                                Info
                                            </div>
                                            <div className="p-3 space-y-2 flex flex-wrap justify-center">
                                                <Button className="px-3 py-2 w-[200px] h-fit font-sora rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                    Subsystem: {user.subsystem}
                                                </Button>
                                                <Button className="px-3 py-2 w-[200px] h-fit font-sora rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                    Personal Email: {user.personalEmail}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Eight Nine Number: {user.eightNine}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Hazing: {user.hazingStatus}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Fees: {user.feeStatus}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    T-Shirt Size: {user.shirtSize}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Account Created: {user.accountCreationDate}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Account Last Updated: {user.accountLastUpdatedDate}
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Tasks Section */}
                                        <div className="flex flex-col flex-1">
                                            {/* Tasks Header */}
                                            <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold text-2xl text-foreground p-2">
                                                Tasks
                                            </div>

                                            {tasks.slice(0, 3).map(task => (
                                                <div key={task.taskId} className="flex p-2 max-w-full gap-4">
                                                    <div className="w-4 h-4">
                                                        <ListTodoIcon className="w-5 h-5" />
                                                    </div>
                                                    <Button className="text-sora text-sm">
                                                        {task.taskName}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
