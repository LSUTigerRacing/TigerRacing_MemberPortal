import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Plus, Ellipsis, Trash, Circle, ChevronDownIcon, Pencil } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

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
    createTask: (columnId: Id, title: string, description: string, startDate?: Date, endDate?: Date) => void
    deleteTask: (id: Id) => void
    tasks: Task[]
    updateTask: (taskId: Id, title: string, description: string, startDate?: Date, endDate?: Date) => void
    editingTask: Task | null
    setEditingTask: (task: Task | null) => void
    setEditingColumn: (column: Column | null) => void
}

export function ColumnContainer (props: Props) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const {
        column,
        deleteColumn,
        createTask,
        deleteTask,
        tasks,
        updateTask,
        editingTask,
        setEditingTask,
        setEditingColumn
    } = props;

    useEffect(() => {
        if (editingTask && editingTask.columnId === column.id) {
            setTaskTitle(editingTask.content);
            setTaskDescription(editingTask.taskDescription);
            setStartDate(editingTask.startDate);
            setEndDate(editingTask.endDate);
            setIsOpen(true);
        }
    }, [editingTask, column.id]);

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

    const handleSubmit = () => {
        if (editingTask) {
            updateTask(editingTask.id, taskTitle, taskDescription, startDate, endDate);
            setEditingTask(null);
        } else {
            createTask(column.id, taskTitle, taskDescription, startDate, endDate);
        }
        // Reset form
        setTaskTitle("");
        setTaskDescription("");
        setStartDate(undefined);
        setEndDate(undefined);
        setIsOpen(false);
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="flex flex-col w-[18vw] p-4 h-full"
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
                        <DropdownMenuItem onClick={() => setEditingColumn(column)}>
                            <Pencil />
                            Edit
                        </DropdownMenuItem>
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
                            <TaskCard key={task.id} column={column} task={task} deleteTask={deleteTask} setEditingTask={setEditingTask} />
                        ))}
                    </SortableContext>
                </div>
            </div>
            <div className="">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    <DialogContent className="sm:max-w-[30vw] border-5">
                        <DialogHeader>
                            <DialogTitle>
                                {editingTask ? "Edit task" : "Create new task"}
                            </DialogTitle>
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
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date" className="px-1">
                                        Start Date
                                    </Label>
                                    <Popover open={startOpen} onOpenChange={setStartOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {startDate ? startDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0 bg-white" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                captionLayout="dropdown"
                                                onSelect={date => {
                                                    setStartDate(date);
                                                    setStartOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date" className="px-1">
                                        End Date
                                    </Label>
                                    <Popover open={endOpen} onOpenChange={setEndOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {endDate ? endDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0 bg-white" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                captionLayout="dropdown"
                                                onSelect={date => {
                                                    setEndDate(date);
                                                    setEndOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setEditingTask(null);
                                        setTaskTitle("");
                                        setTaskDescription("");
                                        setStartDate(undefined);
                                        setEndDate(undefined);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose>
                                <Button variant="outline" onClick={handleSubmit}>
                                    {editingTask ? "Save" : "Create"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    );
}
