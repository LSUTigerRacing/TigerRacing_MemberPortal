import type { Task, Id, Column } from "./KanbanBoard";
import { Ellipsis, Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/shadcn-components/button";
import { Card } from "@/components/ui/shadcn-components/card";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn-components/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn-components/sheet"
import { Separator } from "@/components/ui/shadcn-components/separator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { Label } from "@/components/ui/shadcn-components/label";

interface Props {
  column: Column;
  task: Task;
  deleteTask: (id: Id) => void;
  setEditingTask: (task: Task | null) => void;
}

export function TaskCard({ column, task, deleteTask, setEditingTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const { 
    setNodeRef, 
    attributes, 
    listeners, 
    transform,
    transition,
    isDragging
  } =
  useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    if (!isDragging) {
      setMouseIsOver(false);
    }
  }, [isDragging]);

  if(isDragging) {
    return (
      <div
        ref={setNodeRef} 
        style={style}
        className="opacity-0">
          <div className="p-4">
            {task.content}
          </div>
      </div>
  )}

  return (
  <Card 
    className="h-[7vh] justify-center pl-2"
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
            <span style={{ cursor: 'pointer'}}>
              <p className="font-semibold text-black whitespace-normal break-words hover:text-blue-700 hover:underline">{task.content}</p>
            </span>
          </SheetTrigger>
            <SheetContent className="min-w-[67vw] top-16 h-[calc(100vh-4rem)] rounded-l-3xl border-1">
              <SheetHeader className="">
                <SheetTitle className="">
                  <p className="font-semibold text-black whitespace-normal break-words">{task.content}</p>
                </SheetTitle>
              </SheetHeader>
              <Separator className="-mt-4"/>
              <div className="flex min-h-0 flex-grow gap-4 overflow-y-auto">
                <div className="flex-grow flex flex-col pt-2 pl-3 border-1 ml-3 ">
                  <SheetDescription className="flex-grow">
                    <p className="text-sm text-gray-600 mt-1 whitespace-normal break-words">{task.taskDescription}</p>
                  </SheetDescription>
                  <div className="">footer</div>
                </div>
                <div className="min-w-[18vw] pl-5 flex flex-col gap-5">
                  <div>
                    <Label className="text-sm font-semibold">Status</Label>
                    {column.title}
                  </div>
                  <div className="">
                    <Label className="text-sm font-semibold">Start Date</Label>
                    {task.startDate ? (
                      <div>
                        <p className="text-sm">
                          {new Date(task.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm">To Be Determined</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">End Date</Label>
                    {task.endDate ? (
                      <div>
                        <p className="text-sm">
                          {new Date(task.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                        <p className="text-sm">To Be Determined</p>
                      )}
                  </div>
                </div>
              </div>
            </SheetContent>
        </Sheet>
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
          <Button 
            variant="ghost" 
            className={`w-10 ${mouseIsOver ? 'opacity-100' : 'opacity-0'}`}
          >
            <Ellipsis />
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="start">
            <DropdownMenuLabel>Task</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setEditingTask(task)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
                deleteTask(task.id);
              }}>
                <Trash />
                Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Card>
  )
}