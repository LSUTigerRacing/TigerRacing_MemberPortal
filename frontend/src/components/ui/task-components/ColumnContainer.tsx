import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Plus, Ellipsis, Trash, Circle } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Column, Id, Task } from "./KanbanBoard";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TaskCard } from "./TaskCard";

const strokeColors = [
    "stroke-[#25292E]",
    "stroke-[#1D76DD]",
    "stroke-[#1A7F37]",
    "stroke-[#9A6700]",
    "stroke-[#BC4C00]",
    "stroke-[#DA4E57]",
    "stroke-[#BF3989]",
    "stroke-[#8250DF]"
];

interface Props {
    column: Column
    deleteColumn: (id: Id) => void
    createTask: (columnId: Id, title: string, description: string) => void
    deleteTask: (id: Id) => void
    tasks: Task[]
}

export function ColumnContainer (props: Props) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const {
        column,
        deleteColumn,
        createTask,
        deleteTask,
        tasks
    } = props;

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    }
        = useSortable({
            id: column.id,
            data: {
                type: "Column",
                column
            }
        });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="flex flex-col w-70 p-4"
            >
            </div>
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="flex flex-col w-70 p-4 h-full"
        >
            <div
                {...attributes}
                {...listeners}
                className="flex justify-between items-center"
            >
                <div className="flex items-start gap-2">
                    <div className={`${column.color} rounded-full mt-3`}>
                        <Circle className={strokeColors[column.colorIndex]} />
                    </div>
                    <div className="flex-1 min-w-0 mt-3">
                        <p className="font-semibold text-black whitespace-normal break-words">{column.title}</p>
                        <p className="text-sm text-gray-600 mt-1 whitespace-normal break-words">{column.description}</p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-10">
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="start">
                        <DropdownMenuLabel>Column</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            deleteColumn(column.id);
                        }}
                        >
                            <Trash />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex-grow overflow-y-auto overflow-x-hidden px-2 min-h-0">
                <div className="flex flex-col gap-4 py-2">
                    <SortableContext items={tasksIds}>
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
                        ))}
                    </SortableContext>
                </div>
            </div>
            <div className="">
                <Dialog>
                    <div className="flex mt-4 gap-2">
                        <div className="">
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="flex gap-2 items-center">
                                    <Plus />
                                    Add task
                                </Button>
                            </DialogTrigger>
                        </div>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create new task</DialogTitle>
                            <div className="pt-2">
                                <Separator />
                            </div>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label>Create title</Label>
                                <Input
                                    placeholder="Title"
                                    value={taskTitle}
                                    onChange={e => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label>Description</Label>
                                <Textarea
                                    className="h-40"
                                    placeholder="Type your description here..."
                                    value={taskDescription}
                                    onChange={e => setTaskDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        createTask(column.id, taskTitle, taskDescription);
                                        setTaskTitle("");
                                        setTaskDescription("");
                                    }}
                                >
                                    Create
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    );
}
