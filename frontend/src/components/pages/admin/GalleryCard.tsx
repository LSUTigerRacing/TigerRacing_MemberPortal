import type { User } from "@/components/member-data-format/user";

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
        users.length > 0
            ? (
                <Carousel
                    className="max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex-col sm:flex-row mt-6 sm:mt-3 px-1 justify-self-center"
                    setApi={setCarouselApi}
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground sm:w-5 sm:h-5 w-8 h-8 rounded-full shadow-none"
                        aria-label="Back to column view"
                        onClick={() =>
                            view === "gallery" ? setView("column") : setView("gallery")}
                    >
                        <ArrowLeftFromLine className="scale-100 text-red-500" aria-hidden />
                    </Button>
                    <CarouselContent>
                        {users.map(user => (
                            <CarouselItem key={user.UserId}>
                                <div className="flex justify-center items-center p-1 gap-2">
                                    <Card className="bg-background rounded-2xl mx-6">
                                        <CardContent className="flex flex-col w-full p-5">

                                            {/* Avatar and Member Info Section */}
                                            <div className="flex flex-row items-center mb-4">
                                                {/* Avatar Section */}
                                                <div className="flex flex-wrap max-h-full text-4xl">
                                                    <Avatar className="w-12 h-12 md:h-15 md:w-15">
                                                        <AvatarImage
                                                            src="https://github.com/shadcn.png"
                                                            alt="@shadcn"
                                                        />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                </div>

                                                {/* Container for Name and Details */}
                                                <div className="flex flex-col ml-4">

                                                    {/* Container for Name and More Icon */}
                                                    <div className="flex flex-row gap-2 w-fit">
                                                        <div className="font-manrope font-semibold text-lg md:text-2xl text-foreground pb-2">
                                                            {user.Name}
                                                        </div>
                                                        <MemberDropdown
                                                            user={user}
                                                            onDeleteMember={onDeleteMember}
                                                        />
                                                    </div>

                                                    {/* Details Section */}
                                                    <div className="flex flex-col sm:flex-row w-fit gap-3">
                                                        <div className="text-sm md:text-lg lg:text-lg font-sora text-gray-600">
                                                            {user.LSUEmail}
                                                        </div>
                                                        <div className="text-sm md:text-lg lg:text-lg font-sora text-gray-600">
                                                            {user.System}
                                                        </div>
                                                        <div className="text-sm md:text-lg lg:text-lg font-sora text-gray-600">
                                                            {user.GradDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Three Column Info Section */}
                                            <div className="flex sm:gap-x-2 flex-col sm:flex-row mb-4">
                                                {/* Info Section */}
                                                <div className="flex flex-col sm:flex-wrap sm:min-w-1 flex-1">
                                                    <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold sm:text-xl lg:text-2xl text-foreground p-2">
                                                        Info
                                                    </div>
                                                    <div className="p-1 sm:p-3 space-y-2 flex flex-wrap justify-center">
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Subsystem: {user.Subsystem}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Personal Email: {user.PersonalEmail}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Eight Nine Number: {user.EightNine}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Hazing: {user.HazingStatus}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Fees: {user.FeeStatus}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            T-Shirt Size: {user.ShirtSize}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Account Created: {user.AccountCreationDate}
                                                        </Button>
                                                        <Button className="px-3 w-full py-2 h-fit font-sora md:text-md text-sm rounded-full bg-primary text-white whitespace-break-spaces wrap-break-word">
                                                            Account Last Updated: {user.AccountLastUpdatedDate}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Tasks Section */}
                                                <div className="flex flex-col flex-1">
                                                    {/* Tasks Header */}
                                                    <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold sm:text-xl lg:text-2xl text-foreground p-2">
                                                        Tasks
                                                    </div>

                                                    {/* Tasks Information */}
                                                    <div className="flex p-2 max-w-full gap-4">
                                                        <div className="w-4 h-4">
                                                            <ListTodoIcon className="sm:w-4 sm:h-4 w-5 h-5" />
                                                        </div>
                                                        <div className="text-sora md:text-md text-sm">
                                                            Create ToDo List on Saturday, October 32nd
                                                        </div>
                                                    </div>

                                                    <div className="flex p-2 max-w-full gap-4">
                                                        <div className="w-4 h-4">
                                                            <ListTodoIcon className="sm:w-4 sm:h-4 w-5 h-5" />
                                                        </div>
                                                        <div className="text-sora md:text-md text-sm">
                                                            Create member portal
                                                        </div>
                                                    </div>

                                                    <div className="flex p-2 max-w-full gap-4">
                                                        <div className="w-4 h-4">
                                                            <ListTodoIcon className="sm:w-4 sm:h-4 w-5 h-5" />
                                                        </div>
                                                        <div className="text-sora md:text-md text-sm">Create thingy</div>
                                                    </div>
                                                </div>

                                                {/* Other Section */}
                                                <div className="flex flex-col flex-1">
                                                    <div className="border-b border-black pt-4 font-manrope text-center font-semibold sm:text-xl lg:text-2xl text-foreground p-2">
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
                    <CarouselPrevious className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 -left-3 sm:-left-4" />
                    <CarouselNext className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 -right-3 sm:-right-4" />
                </Carousel>
            )
            : (
                <div className="h-22 p-6 text-center text-sora text-lg">
                    No results.
                </div>
            )
    );
};
