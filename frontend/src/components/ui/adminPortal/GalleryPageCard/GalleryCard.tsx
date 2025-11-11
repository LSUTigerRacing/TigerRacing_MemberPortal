import type { Member } from "@/components/dummyData/members";
import * as React from "react";
import { useEffect } from "react";
import { ListTodoIcon, ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import DropdownMenuDemo from "@/components/ui/adminPortal/dropdownMenu/dropdownMenu";

interface FilterMemberCarouselProps {
  members: Member[];
  onDeleteMember: (memberId: string) => void;
  selectedMemberId: string | null;
  view: "column" | "gallery";
  setView: React.Dispatch<React.SetStateAction<"column" | "gallery">>;
}

export default function CarouselDemo({
  members,
  onDeleteMember,
  selectedMemberId,
  view,
  setView,
}: FilterMemberCarouselProps) {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi || !selectedMemberId) return;

    const selectedIndex = members.findIndex(
      (member) => member.id === selectedMemberId
    );

    if (selectedIndex !== -1) {
      carouselApi.scrollTo(selectedIndex, true); // true stopped it from doing the crazy scroll thing
    }
  }, [carouselApi, selectedMemberId, members]);

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
          view === "gallery" ? setView("column") : setView("gallery")
        }
      >
        <ArrowLeftFromLine className="scale-115 text-red-500" aria-hidden />
      </Button>
      <CarouselContent>
        {members.map((member) => (
          <CarouselItem key={member.id}>
            <div className="flex justify-between p-1 max-w-full gap-2">
              <Card className="w-full h-full bg-primary-background rounded-2xl">
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
                          {member.name}
                        </div>
                        <DropdownMenuDemo
                          member={member}
                          onDeleteMember={onDeleteMember}
                        />
                      </div>

                      {/* Details Section */}
                      <div className="flex gap-20">
                        <div className="ml-4 font-sora text-gray-600">
                          {member.year}
                        </div>
                        <div className="ml-4 font-sora text-gray-600">
                          {member.system}
                        </div>
                        <div className="ml-4 font-sora text-gray-600">
                          {member.grad}
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
                        <Button className="px-3 py-2 w-[200px] h-fit font-sora rounded-full bg-primary text-white whitespace-break-spaces break-words">
                          Subsystem: {member.subsystem}
                        </Button>
                        <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                          Join Date: {member.joinDate}
                        </Button>
                        <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                          Hazing: {member.hazing}
                        </Button>
                        <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                          Fees: {member.dues}
                        </Button>
                        <Button className="px-3 w-[200px] py-2 font-sora rounded-full bg-primary text-white">
                          T-Shirt Size: {member.shirtSize}
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
