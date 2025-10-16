"use client"

import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { data, type Member } from "@/components/dummyData/members"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function CardDemo() {

  return (
    <>
    <div className="flex flex-col gap-9">
        {(data as Member[]).map((members) => (
            <div key={members.id} className="bg-primary-background w-full gap-2 p-6 justify-between flex items-center rounded-4xl">
                <div className="flex items-center mb-4">
                    <div className="flex w-full h-full items-center text-4xl">
                        <Avatar className="h-15 w-15">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>                    
                    <div>
                        <div className="ml-4 font-manrope font-semibold text-2xl text-foreground pb-2">
                                {members.name}
                        </div>
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
        ))}
        </div>
    </>
)}
