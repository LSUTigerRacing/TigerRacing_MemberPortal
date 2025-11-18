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

import type { User } from "@/lib/member-data-format/user";

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

    useEffect(() => {
        if (!carouselApi || !selectedMemberId) return;

        const selectedIndex = users.findIndex(
            user => user.UserId === selectedMemberId
        );

        if (selectedIndex !== -1) {
            carouselApi.scrollTo(selectedIndex, true); // true stopped it from doing the crazy scroll thing
        }
    }, [carouselApi, selectedMemberId, users]);

    return (
        <Carousel
            className="max-h-screen max-w-3xl mx-auto flex flex-column justify-self-center-safe mt-6 p-0"
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
                    <CarouselItem key={user.UserId}>
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
                                                    {user.Name}
                                                </div>
                                                <MemberDropdown user={user} onDeleteMember={onDeleteMember} />
                                            </div>

                                            {/* Details Section */}
                                            <div className="flex gap-20">
                                                <div className="ml-4 font-sora text-gray-600">
                                                    {user.LSUEmail}
                                                </div>
                                                <div className="ml-4 font-sora text-gray-600">
                                                    {user.System}
                                                </div>
                                                <div className="ml-4 font-sora text-gray-600">
                                                    {user.GradDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Three Column Info Section */}
                                    <div className="flex gap-x-20 w-full mb-4">
                                        {/* Info Section */}
                                        <div className="flex flex-col flex-1">
                                            <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold text-2xl text-foreground p-2">
                                                Info
                                            </div>
                                            <div className="p-3 space-y-2 flex flex-wrap justify-center">
                                                <Button className="px-3 py-2 w-[200px] h-fit font-sora rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                    Subsystem: {user.Subsystem}
                                                </Button>
                                                <Button className="px-3 py-2 w-[200px] h-fit font-sora rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                    Personal Email: {user.PersonalEmail}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Eight Nine Number: {user.EightNine}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Hazing: {user.HazingStatus}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Fees: {user.FeeStatus}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    T-Shirt Size: {user.ShirtSize}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Account Created: {user.AccountCreationDate}
                                                </Button>
                                                <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                                                    Account Last Updated: {user.AccountLastUpdatedDate}
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Tasks Section */}
                                        <div className="flex flex-col flex-1">
                                            {/* Tasks Header */}
                                            <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold text-2xl text-foreground p-2">
                                                Tasks
                                            </div>

                                            {/* Tasks Information */}
                                            <div className="flex p-2 max-w-full gap-4">
                                                <div className="w-4 h-4">
                                                    <ListTodoIcon className="w-5 h-5" />
                                                </div>
                                                <div className="text-sora text-sm">
                                                    Create ToDo List on Saturday, October 32nd
                                                </div>
                                            </div>

                                            <div className="flex p-2 max-w-full gap-4">
                                                <div className="w-4 h-4">
                                                    <ListTodoIcon className="w-5 h-5" />
                                                </div>
                                                <div className="text-sora text-sm">
                                                    Create member portal
                                                </div>
                                            </div>

                                            <div className="flex p-2 max-w-full gap-4">
                                                <div className="w-4 h-4">
                                                    <ListTodoIcon className="w-5 h-5" />
                                                </div>
                                                <div className="text-sora text-sm">Create thingy</div>
                                            </div>
                                        </div>

                                        {/* Other Section */}
                                        <div className="flex flex-col flex-1">
                                            <div className="border-b border-black pt-4 font-manrope text-center font-semibold text-2xl text-foreground p-2">
                                                Other
                                            </div>
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
