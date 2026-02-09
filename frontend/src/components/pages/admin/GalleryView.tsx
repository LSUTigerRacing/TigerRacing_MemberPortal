import {
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction
} from "react";
import { ArrowLeftFromLine } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

import UserDropdown from "@/components/pages/admin/UserDropdown";

import type { API } from "@/lib/API";

import type { TRAPI } from "../../../../../shared/typings/api";

interface GalleryViewProps {
    users: Awaited<ReturnType<API["fetchUsers"]>>["data"]
    activeUser: TRAPI.User["id"] | null

    view: "column" | "gallery"
    setView: Dispatch<SetStateAction<"column" | "gallery">>

    deleteUser: (id: TRAPI.User["id"]) => void
}

export default function GalleryView ({
    users,
    activeUser,
    setView,
    deleteUser
}: GalleryViewProps) {
    const [carouselAPI, setCarouselAPI] = useState<CarouselApi>();
    useEffect(() => {
        if (!carouselAPI || !activeUser) return;

        const i = users.findIndex(user => user.id === activeUser);
        if (i !== -1) carouselAPI.scrollTo(i, true);
    }, [carouselAPI, activeUser, users]);

    return (
        <div className="flex flex-col justify-center mt-3 sm:flex-row">
            <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground w-10 h-10 rounded-full shadow-none"
                onClick={() => setView("column")}
                aria-label="Back to column view"
            >
                <ArrowLeftFromLine className="scale-115 text-red-500" />
            </Button>
            <Carousel className="w-3/4 xl:w-1/2" setApi={setCarouselAPI}>
                <CarouselContent>
                    {users.map((user, i) => (
                        <CarouselItem key={i}>
                            <div className="p-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex flex-col items-center justify-between xl:flex-row xl:items-start">
                                            <div className="flex flex-col lg:flex-row items-center">
                                                <div className="aspect-square me-4">
                                                    <Avatar className="h-32 w-32">
                                                        <AvatarImage
                                                            src="https://github.com/shadcn.png"
                                                            alt="@shadcn"
                                                        />
                                                        <AvatarFallback>CM</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                                                    <CardDescription className="flex flex-col items-center mt-4 xl:mt-1 xl:flex-row xl:items-start font-manrope gap-1">
                                                        <Badge className="bg-accent text-black">Class of {user.gradYear}</Badge>
                                                        <Badge className="bg-accent text-black">{user.system}</Badge>
                                                        <Badge className="bg-accent text-black">{user.subsystem}</Badge>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <UserDropdown user={user} deleteUser={deleteUser} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col xl:grid xl:grid-cols-3 gap-3">
                                            <span className="text-center">Info</span>
                                            <span className="text-center">Projects</span>
                                            <span className="text-center">Other</span>
                                            <Separator className="my-2" />
                                            <Separator className="my-2" />
                                            <Separator className="my-2" />
                                            <div className="flex flex-col gap-2">
                                                <Badge className="bg-accent text-black"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</Badge>
                                                <Badge className="bg-accent text-black"><strong>Hazing Form:</strong> {user.hazingStatus ? "Completed" : "Incomplete"}</Badge>
                                                <Badge className="bg-accent text-black"><strong>Fees:</strong> {user.feeStatus ? "Paid" : "Unpaid"}</Badge>
                                                <Badge className="bg-accent text-black"><strong>Shirt Size:</strong> {user.shirtSize}</Badge>
                                            </div>
                                            <div className="flex flex-col gap-2 items-center">
                                                <span className="text-xs">Coming Soon!</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-xs">Within every relationship there is the oppressed and the oppressor. The oppressor is that whom "others" others.</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <Separator />
                                    <CardFooter>
                                        <span className="text-xs text-gray-400">Last updated: {new Date(user.updatedAt).toLocaleDateString()}</span>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
