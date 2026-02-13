// Component for an entire Kanban column
// Renders Column Header and Title
// Renders the tasks inside the columns
// Handles task creation and editing inside each column
// Dropdown for moving columns left and right
// Allows for deleting and editing column creation

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Ellipsis,
  Trash,
  Circle,
  CalendarIcon,
  Pencil,
  PaperclipIcon,
  MoveLeftIcon,
  MoveRightIcon,
} from "lucide-react";
import { SortableContext } from "@dnd-kit/sortable";
import type { Column, Id, Task } from "./KanbanBoard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TaskCard } from "./TaskCard";
import { TagsCombobox } from "./TagsCombobox";
import { AssigneesCombobox } from "./AssigneesCombobox";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DescriptionEditor } from "./MarkdownEditor";
import { useDroppable } from "@dnd-kit/core";

const strokeColors = [
  "stroke-[#25292E]",
  "stroke-[#1D76DD]",
  "stroke-[#1A7F37]",
  "stroke-[#9A6700]",
  "stroke-[#BC4C00]",
  "stroke-[#DA4E57]",
  "stroke-[#BF3989]",
  "stroke-[#8250DF]",
];

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  createTask: (
    columnId: Id,
    title: string,
    description: string,
    startDate?: Date,
    endDate?: Date,
    priority?: "High" | "Medium" | "Low",
    tags?: string[],
    assignees?: string[],
    attachments?: File[]
  ) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
  updateTask: (
    taskId: Id,
    title: string,
    description: string,
    startDate?: Date,
    endDate?: Date,
    priority?: "High" | "Medium" | "Low",
    tags?: string[],
    assignees?: string[],
    attachments?: File[]
  ) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  setEditingColumn: (column: Column | null) => void;
  moveColumnLeft: (id: Id) => void;
  moveColumnRight: (id: Id) => void;
  columnIndex: number;
  totalColumns: number;
}

export function ColumnContainer({
  column,
  deleteColumn,
  createTask,
  deleteTask,
  tasks,
  updateTask,
  editingTask,
  setEditingTask,
  setEditingColumn,
  moveColumnLeft,
  moveColumnRight,
  columnIndex,
  totalColumns,
}: Props) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [tags, setTags] = useState<string[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  const tasksIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  // Reset all form fields
  const resetForm = useCallback(() => {
    setTaskTitle("");
    setTaskDescription("");
    setStartDate(undefined);
    setEndDate(undefined);
    setPriority("Medium");
    setTags([]);
    setAssignees([]);
    setAttachments([]);
  }, []);

  // Populates dialog with data when editing. Adjust when adding features to dialog.
  useEffect(() => {
    if (!editingTask || editingTask.columnId !== column.id) return;
    setTaskTitle(editingTask.content);
    setTaskDescription(editingTask.taskDescription);
    setStartDate(editingTask.startDate);
    setEndDate(editingTask.endDate);
    setPriority(editingTask.priority ?? "Medium");
    setTags(editingTask.tags ?? []);
    setAssignees(editingTask.assignees ?? []);
    setAttachments(editingTask.attachments ?? []);
    setIsOpen(true);
  }, [editingTask, column.id]);

  // When clicking out of dialog without creation makes sure to clear inputs
  useEffect(() => {
    if (!isOpen) {
      setEditingTask(null);
      resetForm();
    }
  }, [isOpen, resetForm, setEditingTask]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: "Column", column },
  });

  // Handler for creating and updating tasks.
  const handleSubmit = useCallback(() => {
    if (editingTask) {
      updateTask(
        editingTask.id,
        taskTitle,
        taskDescription,
        startDate,
        endDate,
        priority,
        tags,
        assignees,
        attachments
      );
      setEditingTask(null);
    } else {
      createTask(
        column.id,
        taskTitle,
        taskDescription,
        startDate,
        endDate,
        priority,
        tags,
        assignees,
        attachments
      );
    }
    resetForm();
    setIsOpen(false);
  }, [
    editingTask,
    updateTask,
    createTask,
    column.id,
    taskTitle,
    taskDescription,
    startDate,
    endDate,
    priority,
    tags,
    assignees,
    attachments,
    resetForm,
    setEditingTask,
  ]);

  return (
    <Card ref={setNodeRef} className="flex flex-col w-72 sm:w-80 lg:w-96 flex-shrink-0 p-0 pt-4 h-full bg-white">
      {/* Column Header with drag listeners attached  */}
      <div className="flex justify-between">
        <div className="flex items-start gap-2">
          <div className={`${column.color} rounded-full mt-3 ml-3`}>
            <Circle className={strokeColors[column.colorIndex]} />
          </div>
          {/* Column Title and Description Display */}
          <div className="flex-1 min-w-0 mt-2">
            <p className="font-semibold text-2xl text-black whitespace-normal break-words">
              {column.title}
            </p>
            <p className="text-sm text-gray-600 mt-1 whitespace-normal break-words">
              {column.description}
            </p>
          </div>
        </div>
        {/* Dropdown Button for Editing, Deleting, and Moving Columns*/}
        <div className="mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-white">
              <Button variant="ghost" className="bg-white w-10 cursor-pointer">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="start">
              <DropdownMenuLabel>Column</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columnIndex > 0 && (
                <DropdownMenuItem
                  onClick={() => moveColumnLeft(column.id)}
                  className="cursor-pointer"
                >
                  <MoveLeftIcon /> Move Left
                </DropdownMenuItem>
              )}
              {columnIndex < totalColumns - 1 && (
                <DropdownMenuItem
                  onClick={() => moveColumnRight(column.id)}
                  className="cursor-pointer"
                >
                  Move Right <MoveRightIcon />
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditingColumn(column)} className="cursor-pointer">
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteColumn(column.id);
                }}
                className="cursor-pointer"
              >
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Task List through sortable */}
      <div className="flex-grow overflow-y-auto px-2 min-h-0 -mb-6">
        <div className="flex flex-col gap-4">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                column={column}
                task={task}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
      {/* Task Creation Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-gray-200 flex w-full gap-2 justify-start text-lg h-12 cursor-pointer"
          >
            <Plus />
            Add task
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-full max-h-[100svh] sm:max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit task" : "Create new task"}</DialogTitle>
            <div className="pt-2">
              <Separator />
            </div>
          </DialogHeader>
          <div className="grid gap-4 max-w-lg sm:max-w-xl lg:max-w-2xl">
            <div className="grid gap-3">
              <Label>Create title</Label>
              <Input
                placeholder="Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Description</Label>
              <DescriptionEditor value={taskDescription} onChange={setTaskDescription} />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Attachments</Label>
              <div>
                <input
                  type="file"
                  multiple
                  id="fileUpload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      setAttachments([...attachments, ...Array.from(e.target.files)]);
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("fileUpload")?.click()}
                  className="cursor-pointer"
                >
                  Upload Files
                </Button>
              </div>
              {attachments.length > 0 ? (
                <div className="flex flex-col gap-2 mt-2 border p-2 rounded-md bg-gray-50 max-h-40 overflow-y-auto">
                  {attachments.map((file, index) => (
                    <p
                      key={index}
                      className="text-sm text-gray-700 flex items-center gap-2 truncate"
                    >
                      <PaperclipIcon className="h-3 w-3" />
                      {file.name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No attachments uploaded</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  Start Date
                </Label>
                <Popover open={startOpen} onOpenChange={setStartOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal cursor-pointer"
                    >
                      {startDate ? new Date(startDate).toLocaleDateString() : "Select date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate ? new Date(startDate) : undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
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
                      className="w-full justify-between font-normal cursor-pointer"
                    >
                      {endDate ? new Date(endDate).toLocaleDateString() : "Select date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate ? new Date(endDate) : undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setEndDate(date);
                        setEndOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as "High" | "Medium" | "Low")}
                >
                  <SelectTrigger className="w-full cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="High">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        High
                      </div>
                    </SelectItem>
                    <SelectItem value="Medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="Low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        Low
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="flex flex-col gap-3">
                <Label>Tags</Label>
                <TagsCombobox selectedTags={tags} onTagsChange={setTags} />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="flex flex-col gap-3">
                <Label>Assignees</Label>
                <AssigneesCombobox selectedAssignees={assignees} onAssigneesChange={setAssignees} />
              </div>
            </div>
          </div>
          <DialogFooter className="border-t pt-4 mt-4 flex flex-row gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingTask(null);
                  resetForm();
                }}
                className="cursor-pointer flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleSubmit} className="cursor-pointer flex-1 sm:flex-none">
                {editingTask ? "Save" : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
