// Component for Task Cards
// Contains the Drag and Drop behavior for the Tasks
// Handles task creation and editing inside each column
// Allows for deleting and editing column creation

import type { Task, Id, Column } from "./KanbanBoard.js";
import { Ellipsis, Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TaskSheet } from "./TaskSheet.js";
import { teamMembers, priorityStyles } from "@/lib/dummyData/dummyTasks";

interface Props {
    column: Column
    task: Task
    deleteTask: (id: Id) => void
    setEditingTask: (task: Task | null) => void
}

export function TaskCard ({ column, task, deleteTask, setEditingTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
        },
        disabled: isSheetOpen
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    const cardClassName = isDragging
        ? "relative min-h-[60px] p-2 opacity-40 ring-2 ring-blue-300 ring-inset"
        : "relative min-h-[60px] p-2 cursor-grab active:cursor-grabbing";

    return (
        <Card
            className={cardClassName}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(!isSheetOpen && !isDragging && listeners)}
        >
            <div
                className="flex overflow-visible"
                onMouseEnter={() => {
                    if (!isDragging) setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
            >
                {task.priority && (
                    <div
                        className={`absolute left-0 top-0 h-full w-2 rounded-l-xl ${
                            priorityStyles[task.priority]
                        }`}
                    >
                    </div>
                )}
                <div className="mt-4">
                    <TaskSheet task={task} column={column} onOpenChange={setIsSheetOpen} />
                </div>
                <div className="flex top-1 right-2 absolute">
                    {!isDragging && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="bg-white">
                                <Button
                                    variant="ghost"
                                    className={`w-10 h-3 rounded-full cursor-pointer ${
                                        mouseIsOver ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white" align="start">
                                <DropdownMenuLabel>Task</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        setEditingTask({ ...task });
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Pencil />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        deleteTask(task.id);
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Trash />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {task.assignees && task.assignees.length > 0 && (
                        <div className="flex -space-x-2">
                            {task.assignees.slice(0, 3).map(assigneeValue => {
                                const member = teamMembers.find(member => member.value === assigneeValue);
                                if (!member) return null;
                                return (
                                    <Avatar key={assigneeValue} className="h-6 w-6 border-2 border-white">
                                        <AvatarFallback className={`${member.color} text-white text-xs`}>
                                            {member.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                );
                            })}
                            {task.assignees.length > 3 && (
                                <Avatar className="h-6 w-6 border-2 border-white">
                                    <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">
                                        +{task.assignees.length - 3}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
