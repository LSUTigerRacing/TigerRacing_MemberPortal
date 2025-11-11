import type { Task, Id } from "./KanbanBoard";
import { Ellipsis, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    task: Task
    deleteTask: (id: Id) => void
}

export function TaskCard ({ task, deleteTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    }
        = useSortable({
            id: task.id,
            data: {
                type: "Task",
                task
            }
        });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    useEffect(() => {
        if (!isDragging) {
            setMouseIsOver(false);
        }
    }, [isDragging]);

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-0"
            >
                <div className="p-4">
                    {task.content}
                </div>
            </div>
        );
    }

    return (
        <Card
            className=""
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div
                className="justify-between flex items-center overflow-visible"
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
            >
                <div className="flex-1 min-w-0 pl-2">
                    <Sheet modal={false}>
                        <SheetTrigger asChild>
                            <span style={{ cursor: "pointer" }}>
                                <p className="font-semibold text-black whitespace-normal break-words hover:text-blue-700 hover:underline">{task.content}</p>
                            </span>
                        </SheetTrigger>
                        <SheetContent className="min-w-[80vw] top-16 h-[calc(100vh-4rem)] rounded-l-3xl border-1">
                            <SheetHeader className="">
                                <SheetTitle className="">
                                    <p className="font-semibold text-black whitespace-normal break-words">{task.content}</p>
                                </SheetTitle>
                            </SheetHeader>
                            <Separator className="-mt-4" />
                            <div className="flex min-h-0 flex-grow gap-4 overflow-y-auto">
                                <div className="flex-grow flex flex-col pl-3">
                                    <SheetDescription className="flex-grow">
                                        <p className="text-sm text-gray-600 mt-1 whitespace-normal break-words">{task.taskDescription}</p>
                                    </SheetDescription>
                                    <div className="">footer</div>
                                </div>
                                <div className="min-w-[20vw]">
                                    Side Column Area
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            variant="ghost"
                            className={`w-10 ${mouseIsOver ? "opacity-100" : "opacity-0"}`}
                        >
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="start">
                        <DropdownMenuLabel>Task</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            deleteTask(task.id);
                        }}
                        >
                            <Trash />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
}
