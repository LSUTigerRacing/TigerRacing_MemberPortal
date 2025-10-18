import { data, type Member } from "@/components/dummyData/members";
import { MoreHorizontal, ListTodoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CarouselDemo() {
  return (
    <Carousel className="max-h-screen max-w-3xl flex flex-column justify-self-center">
      <CarouselContent>
        {(data as Member[]).map((members) => (
          <CarouselItem key={members.id}>
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
                          {members.name}
                        </div>
                        <div>
                          
                          {/* Dropdown Menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="bg-white">
                              <DropdownMenuLabel className="font-manrope font-extrabold">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(members.id)}
                              >
                                Moderate Member
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(members.id)}
                              >
                                See more
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="flex gap-20">
                        <div className="ml-4 font-sora text-muted-foreground">
                          {members.year}
                        </div>
                        <div className="ml-4 font-sora text-muted-foreground">
                          {members.system}
                        </div>
                        <div className="ml-4 font-sora text-muted-foreground">
                          {members.grad}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Three Column Info Section */}
                  <div className="flex gap-x-20 w-full mb-4">
                    
                    {/* Info Section */}
                    <div className="flex flex-col flex-1">
                      {/* Info Header */}
                      <div className="border-b border-black inline-block pt-4 font-manrope text-center font-semibold text-2xl text-foreground p-2">
                        Info
                      </div>

                      {/* Info Content */}
                      <div className="p-3 space-y-2 flex flex-wrap justify-center">
                        <Button className="px-3 py-2 font-sora rounded-full bg-primary text-white">
                          Subsystem: {members.system}
                        </Button>
                        <Button className="px-3 py-2 font-sora rounded-full bg-primary text-white">
                          Join Date: {members.joinDate}
                        </Button>
                        <Button className="px-3 py-2 font-sora rounded-full bg-primary text-white">
                          Hazing: {members.hazing}
                        </Button>
                        <Button className="px-3 py-2 font-sora rounded-full bg-primary text-white">
                          Fees: {members.dues}
                        </Button>
                        <Button className="px-3 py-2 font-sora rounded-full bg-primary text-white">
                          T-Shirt Size: {members.shirtSize}
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
                        <div className="text-sora text-sm">Create member portal</div>
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
